import { Password, PasswordParams, Passwords, UpdatePasswordParams, User } from '../types';
import { decryptPassword, encryptPassword } from './crypto';
import { createDocument, getDocumentsByField, updateDocument, deleteDocument } from './db';

export const addPassword = (password: PasswordParams, masterPassword: User['masterPassword']) => {
  if (password.key) {
    password.key = encryptPassword(password.key, masterPassword);
  }
  return createDocument('passwords', password);
};

export const getPasswords = async (masterPassword: string, userRef: string) => {
  const userPasswords = (await getDocumentsByField('passwords', 'userId', userRef)) as Passwords;

  //  decrypt the passwords array
  const decryptedPasswords = userPasswords.map((password: Password) => {
    return {
      ...password,
      key: decryptPassword(password.key, masterPassword),
    };
  });

  return decryptedPasswords as Passwords;
};

export const getSinglePassword = async (userId: string, passwordId: string, masterPassword: string) => {
  const passwords = await getPasswords(masterPassword, userId);
  const password: Password | undefined = passwords.find((p: Password) => p.id === passwordId);

  return password;
};

/**
 * It updates a password document in the passwords collection
 * @param id - The id of the password you want to update.
 * @param {UpdatePasswordParams} newData - UpdatePasswordParams
 * @returns A function that takes an id and newData and returns a promise that resolves to the updated
 * document.
 */
export const updatePassword = (id: Password['id'], masterPassword: User['masterPassword'], newData: UpdatePasswordParams) => {
  // encrypt the new password
  if (newData.key) {
    newData.key = encryptPassword(newData.key, masterPassword);
  }

  return updateDocument<UpdatePasswordParams>('passwords', id, newData);
};

/**
 * It deletes a password document from the passwords collection
 * @param id - The id of the document to delete.
 * @returns A function that takes an id and returns a promise that resolves to the result of the
 * deleteDocument function.
 */
export const deletePassword = (id: Password['id']) => {
  return deleteDocument('passwords', id);
};
