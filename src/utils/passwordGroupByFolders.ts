import { getFolders } from './folders';
import { getPasswords } from './passwords';
import { OnePasswordFolder, PasswordGroupByFolder, PasswordsFolder, Password, User } from '../types/index.js';

/**
 * Getting all the passwords and folders for a user, creating a default folder for the user, creating a
 * new array of folders with the passwords property set to an empty array, checking if the password has
 * a folderId that does not exist in the folders array, if it does not exist, it is adding the password
 * to the default folder, checking if the default folder has any passwords, if not, it is setting the
 * passwords array to an empty array, if the password does not have a folderId, it is adding the
 * password to the default folder, this is checking if the password has a folderId that does not exist
 * in the folders array, if it does not exist, it is adding the password to the default folder, setting
 * the qty property to the length of the passwords array, and returning the result
 * @param userId - The user's uid.
 * @param masterPassword - The user's master password.
 * @returns An array of folders with the passwords property set to an empty array.
 */
export const getPasswordGroupByFolders = async (userId: User['uid'], masterPassword: User['masterPassword']) => {
  try {
    const passwords = await getPasswords(masterPassword, userId);
    const folders = await getFolders(userId);

    /* Creating a default folder for the user. */
    const result: PasswordGroupByFolder = [
      {
        id: 'default',
        name: 'Default',
        userId: userId,
        passwords: [],
        qty: 0,
      },
    ];

    /* Creating a new array of folders with the passwords property set to an empty array. */
    folders.forEach((folder: PasswordsFolder) => {
      const folderObj: OnePasswordFolder = {
        id: folder.id,
        name: folder.name,
        userId: folder.userId,
        passwords: [],
        qty: 0,
      };
      result.push(folderObj);
    });

    /* Checking if the password has a folderId that does not exist in the folders array. If
    it does not exist, it is adding the password to the default folder. */
    passwords.forEach((password: Password) => {
      const existingFolder = result.find((folder: PasswordsFolder) => folder.id === password.folderId);

      /* Checking if the default folder has any passwords, if not, it is setting the passwords array to an
      empty array. If the password does not have a folderId, it is adding the password to the default
      folder. */
      if (!result[0].passwords) result[0].passwords = [];
      if (!password.folderId) return (result[0].passwords = [...result[0].passwords, password]);

      /* This is checking if the password has a folderId that does not exist in the folders array. If
      it does not exist, it is adding the password to the default folder. */
      if (!folders.find((folder: PasswordsFolder) => folder.id === password.folderId)) {
        result[0].passwords = [...result[0].passwords, password];
      } else if (existingFolder?.passwords) {
        existingFolder.passwords = [...existingFolder.passwords, password];
      }
    });

    /* Setting the qty property to the length of the passwords array. */
    result.forEach((folder: OnePasswordFolder) => {
      folder.qty = folder.passwords.length;
    });

    return result;
  } catch (_error) {
    return [];
  }
};
