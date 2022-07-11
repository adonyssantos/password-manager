export interface User {
  uid: string;
  username: string; // email
  masterPassword: string;
  displayName: string;
}

export interface UserParams extends User {
  uid?: string;
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

export interface PasswordParams extends Password {
  id?: string;
}

export interface UpdatePasswordParams extends Password {
  id?: string;
  name?: string;
  url?: string;
  username?: string;
  key?: string;
  folderId?: string | null;
}

export interface PasswordsFolder {
  id: Password['id'];
  name: Password['name'];
  userId: Password['userId'];
}

export interface PasswordsFolderParams extends PasswordsFolder {
  id?: PasswordsFolder['id'];
}

export interface UpdatePasswordsFolderParams extends PasswordsFolder {
  id?: PasswordsFolder['id'];
  name?: PasswordsFolder['name'];
  userId?: PasswordsFolder['userId'];
}

export interface PasswordsFoldersState extends PasswordsFolder {
  passwordsQty?: number;
}

export type PasswordsFolders = PasswordsFolder[] | [];
export type Passwords = Password[] | [];
export type Users = User[] | [];
export type PasswordGroupByFolder = unknown;
export type AppError = Error | null | undefined | string;
