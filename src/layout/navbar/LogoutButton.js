import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'context/UserContext';

/**
 * LogoutButton is the button to log-out user and remove localstorage and context data.
 * @name LogoutButton
 * @component
 * @category Layout
 * @subcategory Button
 * @example
 * <LogoutButton setUser={setUser} />
 * @returns Return a component of React.
 */
const LogoutButton = () => {
  const { setUser, logout } = useUser()
  const navigate = useNavigate()

  const removeData = async () => {

    try {
      const { error } = await logout()
      if (error) throw error
      localStorage.removeItem('user');
      
      setUser({
        id: '',
        token: '',
        email: '',
        isLogged: false,
      });
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      navigate('/')
    }
  };
  
  return (
    <Button onClick={removeData} colorScheme='teal'>
      Log Out
    </Button>
  );
};

export default LogoutButton;
