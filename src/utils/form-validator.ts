import { User } from '../types';

interface SignInValidator {
  username: User['username'];
  masterPassword: User['masterPassword'];
  confirmMasterPassword: User['masterPassword'];
}

export const signUpValidator = async (user: SignInValidator) => {
  const { username, masterPassword, confirmMasterPassword } = user;

  if (!username || !masterPassword)
    return Promise.reject({
      disableButton: false,
      message: 'Please fill all fields',
    });

  if (masterPassword !== confirmMasterPassword)
    return Promise.reject({
      disableButton: false,
      message: 'Passwords do not match',
    });

  if (masterPassword.length < 15)
    return Promise.reject({
      disableButton: false,
      message: 'Password must be at least 16 characters',
    });

  const regex = /\d{2,}/;
  if (!regex.test(masterPassword))
    return Promise.reject({
      disableButton: false,
      message: 'Password must have at least 2 numbers',
    });

  const regex2 = /[A-Z]/;
  if (!regex2.test(masterPassword))
    return Promise.reject({
      disableButton: false,
      message: 'Password must have at least 1 uppercase letter',
    });

  const regex3 = /[a-z]/;
  if (!regex3.test(masterPassword))
    return Promise.reject({
      disableButton: false,
      message: 'Password must have at least 1 lowercase letter',
    });

  return Promise.resolve({
    disableButton: true,
    message: '',
  });
};
