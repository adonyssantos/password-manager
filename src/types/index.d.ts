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

export interface UpdatePasswordParams extends v {
  name?: string;
  url?: string;
  username?: string;
  key?: string;
  folderId?: string | null;
}

export interface PasswordsFolder {
  id: string;
  name: string;
  userId: string;
}

export interface PasswordsFoldersState extends PasswordsFolder {
  passwordsQty?: number;
}

export type PasswordsFolders = PasswordsFolder[] | [];
export type Passwords = Password[] | [];
export type Users = User[] | [];
export type PasswordGroupByFolder = unknown;
export type AppError = Error | null | undefined | string;
