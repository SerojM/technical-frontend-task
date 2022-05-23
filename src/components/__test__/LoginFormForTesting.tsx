import axios from 'axios';
import { ReactElement, useState } from 'react';

function LoginFormForTesting():ReactElement {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any>({});

  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1',
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <span className="user">{user.name}</span>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? 'please wait' : 'Login'}
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          Something went wrong!
        </span>
      </form>
    </div>
  );
}

export default LoginFormForTesting;
