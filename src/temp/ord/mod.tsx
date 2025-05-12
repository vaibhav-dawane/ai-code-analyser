import React, { useState } from 'react';

interface SignInProps {
  onSignIn: (username: string, password: string) => void;
  signInError?: string;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, signInError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(username, password);
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {signInError && <div className="error-message">{signInError}</div>}
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={() => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;