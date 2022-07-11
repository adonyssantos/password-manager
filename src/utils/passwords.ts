import { Password, PasswordParams, UpdatePasswordParams } from '../types';
import { createDocument, updateDocument, deleteDocument } from './db';

// TODO: Add password
export const addPassword = (password: PasswordParams) => {
  return createDocument('passwords', password);
};

// TODO: Get an array or object of all folders in the database group by folderId
//* 1. Get the password collection
//* 2. This function recibes the masterPassword
//* 3. Map the collection array and decrypt the passwords
//* 4. Get the user folder list
//* 5. Group the passwords by folder and return it

// TODO: Update a password by id
export const updatePassword = (id: Password['id'], newData: UpdatePasswordParams) => {
  return updateDocument<UpdatePasswordParams>('passwords', id, newData);
};

// TODO: Delete a password by id
export const deletePassword = (id: Password['id']) => {
  return deleteDocument('passwords', id);
};
