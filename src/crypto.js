
const getMessageEncoding = (message) => {
  const enc = new TextEncoder();
  return enc.encode(message);
};


function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


const encryptRSA = async (message, key) => {
  const encoded = getMessageEncoding(message);
  const importedKey = await window.crypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    },
    true,
    ['encrypt'],
  );
  const cipherText = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    },
    importedKey,
    encoded,
  );

  return ab2str(cipherText);
};

const decryptRSA = async (cipherText, key) => {
  const importedKey = await window.crypto.subtle.importKey(
    'jwk',
    key,
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' }, // or SHA-512
    },
    true,
    ['decrypt'],
  );
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' }, // or SHA-512
    },
    importedKey,
    str2ab(cipherText),
  );

  const dec = new TextDecoder();

  return dec.decode(decrypted);
};

const generateRsaKeys = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
  );


  const formattedKeyPair = {
    publicKey: await window.crypto.subtle.exportKey('jwk', keyPair.publicKey),
    privateKey: await window.crypto.subtle.exportKey('jwk', keyPair.privateKey),
  };

  return formattedKeyPair;
};

const generateAESKey = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-CTR',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const exportedKey = await window.crypto.subtle.exportKey('jwk', key);
  return exportedKey;
};


const encryptAES = async (message, key) => {
  const encodedMessage = str2ab(message);
  const counter = window.crypto.getRandomValues(new Uint8Array(16));

  const importedKey = await window.crypto.subtle.importKey('jwk',
    key,
    'AES-CTR',
    true,
    ['encrypt', 'decrypt']);

  const cipherText = await window.crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter,
      length: 64,
    },
    importedKey,
    encodedMessage,
  );

  return {
    counter,
    message: ab2str(cipherText),
  };
};

const decryptAES = async (message, key) => {
  const importedKey = await window.crypto.subtle.importKey('jwk',
    key,
    'AES-CTR',
    true,
    ['encrypt', 'decrypt']);

  const decryptedMessage = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CTR',
      counter: message.counter,
      length: 64,
    },
    importedKey,
    str2ab(message.message),
  );

  return ab2str(decryptedMessage);
};

module.exports = {
  generateRsaKeys,
  encryptRSA,
  decryptRSA,
  generateAESKey,
  encryptAES,
  decryptAES,
};
