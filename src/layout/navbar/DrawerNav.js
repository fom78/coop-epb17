import React from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Link,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as WouterLink } from 'react-router-dom';
import { useUser } from 'context/UserContext';
/**
 * Drawer is a menu-nav style drawer.
 * @name DrawerNav
 * @component
 * @category Layout
 * @subcategory Menu
 * @param {String} [position='left'] - Set position of the drawer. Options are top, botton, right and left.
 * @example
 * <LogoutButton setUser={setUser} />
 * @returns Return a component of React.
 */
const DrawerNav = ({ position = 'left' }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser()

  return (
    <Box>
      <Button colorScheme='teal' onClick={onOpen} size='md'>
        <HamburgerIcon w={7} h={8} />
      </Button>
      <Drawer
        placement={position}
        onClose={onClose}
        isOpen={isOpen}
        allowPinchZoom
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Menu App</DrawerHeader>
            <DrawerBody>
              <Link onClick={onClose} as={WouterLink} to='/home'>
                <Button colorScheme='teal' variant='link' mt='6'>
                  Home
                </Button>
              </Link>
              <Spacer />
              <Link onClick={onClose} as={WouterLink} to='/list'>
                <Button colorScheme='teal' variant='link' mt='6'>
                  Listado Socios
                </Button>
              </Link>
              <Spacer />
              <Link onClick={onClose} as={WouterLink} to='/faq'>
                <Button colorScheme='teal' variant='link' mt='6'>
                  Preguntas Frecuentes
                </Button>
              </Link>
              <Spacer />
              {(user.rol === 'admin' || user.rol === 'mod') &&
                <Link onClick={onClose} as={WouterLink} to='/admin'>
                  <Button colorScheme='teal' variant='link' mt='6'>
                    Administración
                  </Button>
                </Link>
              }
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default DrawerNav;
