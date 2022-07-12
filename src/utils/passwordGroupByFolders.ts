import { OnePasswordFolder, PasswordGroupByFolder, PasswordsFolder, Password, User } from '../types/index.js';
import { getFolders } from './folders';
import { getPasswords } from './passwords';

export const getPasswordGroupByFolders = async (userId: User['uid'], masterPassword: User['masterPassword']) => {
  try {
    const passwords = await getPasswords(masterPassword, userId);
    const folders = await getFolders(userId);

    // the password group by folders
    const result: PasswordGroupByFolder = [
      {
        id: 'default',
        name: 'Default',
        userId: userId,
        passwords: [],
      },
    ];

    // for each item in folders create a object in passwordGroupByFolders array
    folders.forEach((folder: OnePasswordFolder) => {
      const folderObj = {
        id: folder.id,
        name: folder.name,
        userId: folder.userId,
        passwords: [],
      };
      result.push(folderObj);
    });

    // for each item in passwords, if the folderId is not null, add the item to the array of passwords in the folderId key in passwordGroupByFolders array, else add the item to the array of passwords in the default key in passwordGroupByFolders array
    passwords.forEach((password: Password) => {
      if (!result[0].passwords) {
        result[0].passwords = [];
      }

      if (password.folderId) {
        // if a folderId contain a value that is not in the folders array, add the password to the default folder else add the password to the folderId key in passwordGroupByFolders array
        if (!folders.find((folder: OnePasswordFolder) => folder.id === password.folderId)) {
          result[0].passwords.push(password);
        } else {
          const existingFolder = result.find((folder: PasswordsFolder) => folder.id === password.folderId);
          // result.find((folder: PasswordsFolder) => folder.id === password.folderId).passwords.push(password);
          if (existingFolder?.passwords) {
            existingFolder.passwords.push(password);
          }
        }
      } else {
        result[0].passwords.push(password);
      }
    });

    return result;
  } catch (_error) {
    return [];
  }
};

getPasswordGroupByFolders('rS5F6XiNPGBdZGtZlVgyy59kFIyQ', '1234567890!@#$%()qwertyuiopQWERTYUIOP').then(console.log);
