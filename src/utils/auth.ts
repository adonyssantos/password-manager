import { auth } from '../services';
import { createMasterPasswordHash } from './crypto';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateDocument } from './db';
import { User, UserParams } from '../types';

// TODO: Login with email and password
//* 1. Login
//* 2. Compare password
//* 3. Return user or error

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

// TODO: Logout
