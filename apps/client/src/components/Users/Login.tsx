import React from 'react';

interface Props {
  name: string;
}

const Login: React.FC<Props> = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Ahoj, jak to jde</p>
    </div>
  );
};

export default Login;