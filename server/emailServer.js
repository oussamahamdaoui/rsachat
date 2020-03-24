const { resolveMx } = require('dns');
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const { DKIMSign } = require('dkim-signer');
const MailComposer = require('nodemailer/lib/mail-composer');
const fs = require('fs');

/**
 * Get host
 *
 * @param {!string} email
 * @return {string|null}
 */
function getHost(email) {
  const m = /[^@]+@([\w\d\-.]+)/.exec(email);
  return m && m[1];
}

function sendMail({
  from,
  to,
  subject,
  text,
  html,
}) {
  resolveMx(getHost(to), (err, records) => {
    if (err) return false;

    /**
 * Options
 *
 * @type {!Object}
 */
    const opts = {
      dkim: {
        privateKey: fs.readFileSync('./mail.private', 'utf8'),
        keySelector: 'mail',
        domainName: 'rsa-chat.com',
      },
    };
    records.sort((a, b) => (a.priority > b.priority));
    const mailOpts = {
      from,
      to,
      subject,
      text,
      html,
    };

    // build message
    const composer = new MailComposer(mailOpts);
    composer.compile().build((e, message) => {
      let m = message;
      if (opts && opts.dkim && opts.dkim.privateKey) {
        const signature = DKIMSign(message, {
          privateKey: opts.dkim.privateKey,
          keySelector: opts.dkim.keySelector,
          domainName: opts.dkim.domainName,
        });
        m = `${signature}\r\n${message}`;
      }
      const connection = new SMTPConnection({
        port: 25,
        host: records[0].exchange,
        tls: { rejectUnauthorized: false },
        opportunisticTLS: true,
        name: 'rsa-chat.com',
      });
      connection.connect((connectionError) => {
        if (connectionError) return false;
        connection.send({ from, to }, m, (sendMailError, info) => {
          if (sendMailError) return false;
          connection.close();
          return info;
        });
        return true;
      });
      return true;
    });
    return true;
  });
}

if (process.env.NODE_ENV !== 'production') {
  module.exports = ({ text }) => {
    console.log(text); // eslint-disable-line
  };
} else {
  module.exports = sendMail;
}
