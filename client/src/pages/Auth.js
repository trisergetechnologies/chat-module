import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../redux/userSlice';
import { loginUser, registerUser } from '../services/api';

const Auth = () => {
    
  const [isRegister, setIsRegister] = useState(false);
  console.log('Register')
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = isRegister ? await registerUser(form) : await loginUser(form);
      dispatch(loginAction({ user: data.user, token: data.token }));
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };
  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        {isRegister && <input type="text" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />}
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <p onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Already have an account? Login' : 'New user? Register'}</p>
      </form>
    </div>
  );
};

export default Auth;
