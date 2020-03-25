
const getMessageEncoding = (message) => {
  const enc = new TextEncoder();
  return enc.encode(message);
};


function ab2str(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function str2ab(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

const wrapRSAKey = async (keyToWrap, password) => {
  const importedKey = await window.crypto.subtle.importKey(
    'jwk',
    keyToWrap,
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    },
    true,
    ['decrypt'],
  );
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    getMessageEncoding(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );
  const salt = await window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );
  const iv = await window.crypto.getRandomValues(new Uint8Array(12));
  const wrappedKey = await window.crypto.subtle.wrapKey(
    'jwk',
    importedKey,
    wrappingKey,
    {
      name: 'AES-GCM',
      iv,
    },
  );
  return {
    key: ab2str(wrappedKey),
    iv: iv.toString(),
    salt: salt.toString(),
  };
};

const unwrapRSAKey = async ({ key, salt, iv }, password) => {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    getMessageEncoding(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  const unwrappingKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: Uint8Array.from(salt.split(',')),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );
  const unwrappedKey = await window.crypto.subtle.unwrapKey(
    'jwk',
    str2ab(key),
    unwrappingKey,
    {
      name: 'AES-GCM',
      iv: Uint8Array.from(iv.split(',')),
    },
    {
      name: 'RSA-OAEP',
      hash: { name: 'SHA-256' },
    },
    true,
    ['decrypt'],
  );

  return window.crypto.subtle.exportKey('jwk', unwrappedKey);
};


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
  const encodedMessage = getMessageEncoding(message);
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

  return new TextDecoder().decode(decryptedMessage);
};

const generateSignKeys = async () => {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
    },
    true,
    ['sign', 'verify'],
  );

  return {
    publicKey: await window.crypto.subtle.exportKey('jwk', key.publicKey),
    privateKey: await window.crypto.subtle.exportKey('jwk', key.privateKey),
  };
};

const generateSignature = async (message, privateKey) => {
  const encoded = getMessageEncoding(message);
  const importedKey = await window.crypto.subtle.importKey('jwk', privateKey, {
    name: 'ECDSA',
    namedCurve: 'P-384',
  }, true, ['sign']);
  const signature = await window.crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-384' },
    },
    importedKey,
    encoded,
  );
  return ab2str(signature);
};

const verifySignature = async (message, signature, publicKey) => {
  const encoded = getMessageEncoding(message);
  const importedKey = await window.crypto.subtle.importKey('jwk', publicKey, {
    name: 'ECDSA',
    namedCurve: 'P-384',
  }, true, ['verify']);
  return window.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-384' },
    },
    importedKey,
    str2ab(signature),
    encoded,
  );
};


const wrapSignKey = async (keyToWrap, password) => {
  const importedKey = await window.crypto.subtle.importKey(
    'jwk',
    keyToWrap,
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
    },
    true,
    ['sign'],
  );
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    getMessageEncoding(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );
  const salt = await window.crypto.getRandomValues(new Uint8Array(16));
  const wrappingKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );
  const iv = await window.crypto.getRandomValues(new Uint8Array(12));
  const wrappedKey = await window.crypto.subtle.wrapKey(
    'jwk',
    importedKey,
    wrappingKey,
    {
      name: 'AES-GCM',
      iv,
    },
  );

  return {
    key: ab2str(wrappedKey),
    iv: iv.toString(),
    salt: salt.toString(),
  };
};

const unwrapSignKey = async ({ key, salt, iv }, password) => {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    getMessageEncoding(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  const unwrappingKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: Uint8Array.from(salt.split(',')),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['wrapKey', 'unwrapKey'],
  );
  const unwrappedKey = await window.crypto.subtle.unwrapKey(
    'jwk',
    str2ab(key),
    unwrappingKey,
    {
      name: 'AES-GCM',
      iv: Uint8Array.from(iv.split(',')),
    },
    {
      name: 'ECDSA',
      namedCurve: 'P-384',
    },
    true,
    ['sign'],
  );

  return window.crypto.subtle.exportKey('jwk', unwrappedKey);
};


module.exports = {
  generateRsaKeys,
  encryptRSA,
  decryptRSA,
  generateAESKey,
  encryptAES,
  decryptAES,
  wrapRSAKey,
  unwrapRSAKey,
  generateSignKeys,
  generateSignature,
  verifySignature,
  wrapSignKey,
  unwrapSignKey,
};
