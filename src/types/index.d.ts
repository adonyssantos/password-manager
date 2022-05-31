export interface User {
  uid: string;
  username: string; // email
  masterPassword: string;
  displayName: string;
}

export interface Password {
  id: string;
  name: string;
  url: string;
  username: string;
  key: string;
  folderId: string | null;
  userId: string;
}

export interface PasswordsFolder {
  id: string;
  name: string;
  userId: string;
}

export type PasswordsFolders = PasswordsFolder[] | [];
export type Passwords = Password[] | [];
export type Users = User[] | [];
export type PasswordGroupByFolder = unknown;
