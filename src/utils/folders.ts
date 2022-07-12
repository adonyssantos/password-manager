import { PasswordsFolder, PasswordsFolders, PasswordsFolderParams, UpdatePasswordsFolderParams } from '../types';
import { createDocument, getDocumentsByField, updateDocument, deleteDocument } from './db';

/**
 * It creates a new document in the `folders` collection with the given `folder` object
 * @param {PasswordsFolderParams} folder - PasswordsFolderParams
 * @returns A promise that resolves to the newly created document.
 */
export const addFolder = (folder: PasswordsFolderParams) => {
  return createDocument('folders', folder);
};

/**
 * "Get all the folders for a given user."
 *
 * The function takes a userId as an argument and returns a promise that resolves to an array of
 * folders
 * @param {string} userId - The userId of the user whose folders we want to get.
 * @returns An array of folders
 */
export const getFolders = (userId: string) => {
  const folders = getDocumentsByField('folders', 'userId', userId).catch(() => []);

  return folders as Promise<PasswordsFolders>;
};

/**
 * It updates a folder with the given id with the given new data
 * @param id - The id of the folder you want to update.
 * @param {UpdatePasswordsFolderParams} newData - UpdatePasswordsFolderParams
 * @returns A Promise that resolves to the updated document.
 */
export const updateFolder = (id: PasswordsFolder['id'], newData: UpdatePasswordsFolderParams) => {
  return updateDocument<UpdatePasswordsFolderParams>('folders', id, newData);
};

/**
 * It deletes a folder from the database
 * @param id - The id of the folder to delete.
 * @returns A function that takes an id and returns a promise that resolves to the result of the
 * deleteDocument function.
 */
export const deleteFolder = (id: PasswordsFolder['id']) => {
  return deleteDocument('folders', id);
};
