This is a React TypeScript project made with clean architecture standard.

**Technologies:**

- React (Frontend).
- Firebase (Backend as Service).
- Git and GitHub (Version control).
- Husky, lint-staged, Prettier and eslint (Dev dependencies).
- Vite.
- TypeScript.
- React Router DOM.
- Recoil.
- Material UI.
- [Bcryptjs](https://www.abeautifulsite.net/posts/hashing-passwords-with-nodejs-and-bcrypt).
- [Crypto-js](https://www.npmjs.com/package/crypto-js).

## Run Locally

1. Clone the project.

```bash
  git clone https://github.com/adonyssantos/password-manager.git
```

2. Go to the project directory.

```bash
  cd password-manager
```

3. Install dependencies.

```bash
  npm install
```

4. Setup your `.env` file using `.env.example` like reference.

To run this project, you will need to add the following environment variables to your `.env` file.

```env
# filename: .env
NODE_ENV=development
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

5. Start the Firebase Emulators.

```bash
  npm run emulators
```

6. Start the React server.

```bash
  npm run start
```

7. Open the development server in `http://localhost:3000/`.

## Others scripts

### `npm run lint`

Check the code style with eslint and fix it.

### `npm run format`

Check the code format and run prettier.

## Database models

There are three models in this project:

- User
- Password
- PasswordsFolder

### `User`

```ts
export interface User {
  uid: string;
  email: string;
  masterPassword: string;
  displayName: string;
}
```

### `Password`

```ts
export interface Password {
  id: string;
  name: string;
  url: string;
  username: string;
  password: string;
  folderId: string | null; // if is null, it is a password in the default folder
  userId: string;
}
```

### `PasswordsFolder`

```ts
export interface PasswordsFolder {
  id: string;
  name: string;
  userId: string;
}
```

## Request to the database

The user only can make requests to the database if he is logged in. Else he will be redirected to the login page.

The request that the user can make is:

- GET all passwords with the userId
- GET all folders with the userId

With the password and folders of the user in the frontend, the frontend can make the validations to group the passwords by folders.

**Example:**

```ts

// the password group by folders
const passwordGroupByFolders = [
  {
    id: 'default',
    name: 'Default',
    userRef: 'u1',
    passwords: [],
  },
];

// for each item in folders create a object in passwordGroupByFolders array
folders.forEach(folder => {
  const folderObj = {
    id: folder.id,
    name: folder.name,
    userRef: folder.userRef,
    passwords: [],
  };
  passwordGroupByFolders.push(folderObj);
});

// for each item in passwords, if the folderId is not null, add the item to the array of passwords in the folderId key in passwordGroupByFolders array, else add the item to the array of passwords in the default key in passwordGroupByFolders array
passwords.forEach(password => {
  if (password.folderRef) {
    // if a folderRef contain a value that is not in the folders array, add the password to the default folder else add the password to the folderRef key in passwordGroupByFolders array
    if (!folders.find(folder => folder.id === password.folderRef)) {
      passwordGroupByFolders[0].passwords.push(password);
    } else {
      passwordGroupByFolders.find(folder => folder.id === password.folderRef).passwords.push(password);
    }
  } else {
    passwordGroupByFolders[0].passwords.push(password);
  }
});
```

_This code create a object with the passwords grouped by folders in the client side, that can be used in to show the passwords in an components._

Also, the user can:

- POST a new password with his userId
- PUT a password with his userId
- DELETE a password with his userId
- POST a new folder with his userId
- PUT a folder with his userId
- DELETE a folder with his userId

## Components

### PasswordsFolder

This component is used to show the folders of the user. That component is an accordion with MUI.

The `children` prop is used to pass all passwords that are in the folder.

```tsx
const PasswordFolder = ({ children }) => {
  return <Accordion>{children}</Accordion>;
};
```

}

### PasswordItem

This component get all the data of a password in the props and show it in a card.

This component get `password` prop.

```tsx
const PasswordItem = ({ password }) => {
  return (
    <Card>
      <CardContent>//! rest of the code...</CardContent>
    </Card>
  );
};
```

### Home

This component is the main private component of the application.

Here the query to the database is made and the passwords are grouped by folders. Then the component render the folders and the passwords.

```tsx
const Home = () => {
  const passwordGroupByFolders = {}; // an object with the passwords grouped by folders

  // rest of the code...

  return (
    <div>
      {
        // map any item in passwordGroupByFolders and render the PasswordFolder component
        Object.keys(passwordGroupByFolders).map(folderId => {
          return (
            <PasswordFolder key={folderId}>
              {
                // map any item in passwordGroupByFolders[folderId] and render the PasswordItem component
                passwordGroupByFolders[folderId].map(password => {
                  return <PasswordItem key={password.id} password={password} />;
                })
              }
            </PasswordFolder>
          );
        })
      }
    </div>
  );
};
```
