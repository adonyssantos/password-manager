import React from 'react';
import { useUserState } from '../hooks';

const Profile = () => {
  const { user } = useUserState();
  return (
    <div>
      <h1>You are: {user?.displayName}</h1>
      <h2>Your email is: {user?.email}</h2>
      <span>Yor ID is: {user?.uid}</span>
      <p>And your password is: {user?.masterPassword}</p>
    </div>
  );
};

export default Profile;
