import crypto from 'crypto-js';

export const encryptValue = (value: string) =>
  crypto.AES.encrypt(value, process.env.ENCRYPT_KEY).toString();

export const decryptValue = (value: string) =>
  crypto.AES.decrypt(value, process.env.ENCRYPT_KEY).toString(crypto.enc.Utf8);
