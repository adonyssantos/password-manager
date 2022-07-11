import { Password, PasswordParams, UpdatePasswordParams } from '../types';
import { createDocument, updateDocument, deleteDocument } from './db';

/**
 * It takes a password object and creates a new document in the passwords collection
 * @param {PasswordParams} password - PasswordParams
 * @returns A promise that resolves to the newly created document.
 */
export const addPassword = (password: PasswordParams) => {
  return createDocument('passwords', password);
};

// TODO: Get an array or object of all folders in the database group by folderId
//* 1. Get the password collection
//* 2. This function recibes the masterPassword
//* 3. Map the collection array and decrypt the passwords
//* 4. Get the user folder list
//* 5. Group the passwords by folder and return it

/**
 * It updates a password document in the passwords collection
 * @param id - The id of the password you want to update.
 * @param {UpdatePasswordParams} newData - UpdatePasswordParams
 * @returns A function that takes an id and newData and returns a promise that resolves to the updated
 * document.
 */
export const updatePassword = (id: Password['id'], newData: UpdatePasswordParams) => {
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
