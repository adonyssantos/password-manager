import { useUserState } from '../hooks';

const Login = () => {
  const { setUser } = useUserState();

  return (
    <div>
      <button
        onClick={() => {
          setUser({
            uid: '1',
            email: 'dev@adonys.me',
            masterPassword: '123456',
            displayName: 'Adonys Santos',
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
