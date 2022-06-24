import { auth } from '../services';
import { createMasterPasswordHash, compareMasterPassword } from './crypto';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut } from 'firebase/auth';
import { updateDocument, getDocumentsByField } from './db';
import { User, UserParams } from '../types';

/**
 * It takes a user's credentials, fetches the user's data from the database, and returns the user's
 * data if the password is correct
 * @param email - User['username'] - This is the email address of the user.
 * @param password - User['masterPassword'] - This is the user's master password.
 * @returns The user data is being returned if the credentials is correct. Or string error message if the credentials is incorrect.
 */
export const signIn = async (email: User['username'], password: User['masterPassword']): Promise<User | string> => {
  /**
   * It takes a user's credentials, fetches the user's data from the database, and returns the user's
   * data if the password is correct
   * @param {UserCredential} credentials - UserCredential - This is the object that is returned from the
   * firebase.auth().signInWithEmailAndPassword() method.
   * @returns The user data is being returned.
   */
  const getDecryptedUserData = async (credentials: UserCredential) => {
    return await getDocumentsByField('users', 'uid', credentials.user.uid).then((users) => {
      const userData = users[0] as User;

      if (!compareMasterPassword(password, userData.masterPassword)) {
        throw new Error('Invalid password');
      }

      return {
        ...userData,
        masterPassword: password,
      } as User;
    });
  };

  try {
    /* Using the firebase.auth().signInWithEmailAndPassword() method to sign in the user with the email and password. */
    const response = await signInWithEmailAndPassword(auth, email, password).then(getDecryptedUserData);

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error as string);
  }
};

/**
 * It takes a user object, creates a hash of the master password, creates a user with the email and
 * password, and then updates the user document in the database with the user's data
 * @param {UserParams} user - UserParams
 * @returns A promise that resolves to a user object or rejects with an error string.
 */
export const signUp = async (user: UserParams): Promise<User | string> => {
  try {
    const { username, displayName, masterPassword } = user;
    const masterPasswordHash = createMasterPasswordHash(masterPassword);

    const response = await createUserWithEmailAndPassword(auth, username, masterPassword).then(async (credentials) => {
      const userData: User = {
        uid: credentials.user.uid,
        username,
        displayName,
        masterPassword: masterPasswordHash,
      };

      await updateDocument('users', userData.uid, userData);
      return userData;
    });

    return Promise.resolve(response as User);
  } catch (error) {
    return Promise.reject(error as string);
  }
};

/**
 * It signs out the user from the Firebase Auth service
 * @returns A promise that resolves to a string.
 */
export const logout = async (): Promise<string> => {
  try {
    await signOut(auth);
    return Promise.resolve('Logout successful!');
  } catch (error) {
    return Promise.reject(error as string);
  }
};
