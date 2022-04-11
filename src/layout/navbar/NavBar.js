import { Flex, Spacer, Box, Heading, Link, Badge } from '@chakra-ui/react';
// components
import ColorModeSwitcher from 'components/ColorModeSwitcher';
import EmptyModal from 'components/EmptyModal';

import FormEmailPass from './FormEmailPass';
import DrawerNav from './DrawerNav';
import LogoutButton from './LogoutButton';
// context
import { useUser } from 'context/UserContext';
import { useNavigate } from 'react-router-dom';
/**
 * NavBar is the Main bar of APP, with menu, sign up and sing in.
 * @name NavBar
 * @component
 * @category Layout
 * @subcategory NavBar
 * @example
 * <NavBar />
 * @returns Return a component of React.
 */
const NavBar = () => {
  // Get user context data.
  const { user } = useUser()

  const navigate = useNavigate()
  // Render
  return (
    <Flex align='center' justify='center'>
      {user.isLogged ? (
        <>
          {/* Logged. */}
          <Box m='1'>
            <DrawerNav />
          </Box>
          <Spacer />
          <Box>
            <Heading
              fontSize={{ base: '24px', sm: '12px', md: '24px', lg: '42px' }}
            >
              Hola {user.email.split('@')[0]} <Badge variant='outline' colorScheme='blue'>{user.rol}</Badge>
            </Heading>
          </Box>
          <Spacer />
          <Box m='1'>
            <ColorModeSwitcher />
            <LogoutButton />
          </Box>
        </>
      ) : (
        <>
          {/* Not logged. */}
          <Box p='1'>
            <ColorModeSwitcher />
          </Box>
          <Spacer />
          <Box p='1'>
            <Link mr={4} onClick={()=>navigate('/')}>Inicio</Link>
            <Link onClick={()=>navigate('/faq')}>FAQ's</Link>
          </Box>
          <Spacer />

          <Box p='1'>
            <EmptyModal title='Sign In on APP' buttonText='Sign In'>
              <FormEmailPass type='login' />
            </EmptyModal>
            <EmptyModal title='Sign Up on APP' buttonText='Sign Up'>
              <FormEmailPass type='register' />
            </EmptyModal>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default NavBar;
