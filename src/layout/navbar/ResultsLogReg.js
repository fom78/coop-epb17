import { useUser } from 'context/UserContext';
import React, { useContext, useEffect } from 'react';


const ResultsLogReg = ({ email, password, type = 'login' }) => {
  const { login, user } = useUser()

  const loguear = async () => {
    try {
      await login(email, password)
    } catch (error) {
      console.log(error.code);
    } finally {
      console.log(user);
      return user
    }
  }
  // If response is good on LOGIN set that collateral effect.
  if (type === 'login') {
    loguear().then(u => console.log('ffff', u))
    console.log('user: ',user);
    return (
      <h1>Cuenta logueada {user}</h1>
    );
  }
  // If register is good, set a alert.
  if (type === 'register') {
    return (
      <h1>Cuenta creada</h1>
    );
  }
  // Resolve generic cases, like loading, error and fatal error component.
  return (
    <h1>Algo salio malo</h1>
  );
};

export default ResultsLogReg;
