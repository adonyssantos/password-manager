export interface User {
  uid: string;
  username: string; // email
  masterPassword: string;
  displayName: string;
}

export interface UserParams extends User {
  uid?: User['uid'];
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
  id?: Password['id'];
}

export interface UpdatePasswordParams extends Password {
  id?: Password['id'];
  name?: Password['name'];
  url?: Password['url'];
  username?: Password['username'];
  key?: Password['key'];
  folderId?: Password['folderId'];
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
