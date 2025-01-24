// App.tsx
import { useEffect, useState, useContext } from 'react';
import './styles/App.css';
import { io } from 'socket.io-client';
import { SOCKET_URL } from './utils/constants';
import { AppContext } from './context/AppContext';
import AppRouter from './router/AppRouter';

function App() {
  const { state, dispatch } = useContext(AppContext)!;
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('notification', (msg: string) => {
      setMessage(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const setUser = () => {
    dispatch({
      type: 'SET_USER',
      payload: { name: 'John Doe', email: 'john.doe@example.com' },
    });
  };

  const toggleAuth = () => {
    dispatch({ type: 'SET_AUTH', payload: !state.isAuthenticated });
  };

  return (
    <div>
      <AppRouter />
      <h1>Socket.io Client</h1>
      <p>{message}</p>
      <div>
        <p>Count: {state.count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <div>
        <p>User: {state.user.name}</p>
        <button onClick={setUser}>Set User</button>
      </div>
      <div>
        <p>Authenticated: {state.isAuthenticated ? 'Yes' : 'No'}</p>
        <button onClick={toggleAuth}>Toggle Authentication</button>
      </div>
    </div>
  );
}

export default App;
