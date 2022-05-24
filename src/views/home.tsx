import { useUserState } from '../hooks';

const Home = () => {
  const { user, setUser } = useUserState();

  return (
    <div>
      <p>You are logged in like: {user?.displayName}</p>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
