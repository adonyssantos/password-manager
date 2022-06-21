import { AES, enc } from 'crypto-js';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

/**
 * It takes a masterPassword and returns a hash of that masterPassword
 * @param {string} masterPassword - The masterPassword that the user entered
 * @returns A hash of the masterPassword
 */
export const createMasterPasswordHash = (masterPassword: string): string => {
  const salt = genSaltSync(10);
  return hashSync(masterPassword, salt);
};

/**
 * It takes a master password and a master password hash, and returns true if the master password
 * matches the master password hash
 * @param {string} masterPassword - The master password that the user entered.
 * @param {string} masterPasswordHash - This is the hash that was generated when the user first created
 * their master password.
 * @returns A boolean value indicating whether the master password matches the master password hash
 */
export const compareMasterPassword = (masterPassword: string, masterPasswordHash: string): boolean => {
  return compareSync(masterPassword, masterPasswordHash);
};

/**
 * It takes a password and a master password, and returns an encrypted password
 * @param {string} password - The password you want to encrypt.
 * @param {string} masterPassword - The password that the user enters to access the app.
 * @returns A string that is the encrypted password.
 */
export const encryptPassword = (password: string, masterPassword: string): string => {
  return AES.encrypt(password, masterPassword).toString();
};

/**
 * It takes a password hash and a master password, and returns the decrypted password
 * @param {string} passwordHash - The encrypted password hash that was stored in the database.
 * @param {string} masterPassword - The master password that the user entered.
 * @returns A string that is the decrypted password.
 */
export const decryptPassword = (passwordHash: string, masterPassword: string): string => {
  const bytes = AES.decrypt(passwordHash, masterPassword);
  return bytes.toString(enc.Utf8);
};
