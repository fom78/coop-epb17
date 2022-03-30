import { useState } from 'react';
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { isValidEmail, isValidPassword } from 'utils/validation';
import { useUser } from 'context/UserContext';
import Loader from 'components/Loader';

/**
 * FormEmailPass is a form to put email and password with validations.
 * @name FormEmailPass
 * @component
 * @category Form
 * @subcategory EmailPass
 * @param {String} type - Set type modal. Options are login/register.
 * @example
 * <EmptyModal title="Form Login" buttonText="Sign IN" >
 *  <FormEmailPass type='login' />
 * </EmptyModal>
 * @returns Return a component of React.
 */
const FormEmailPass = ({ type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false)

  const { setUser, login, signup } = useUser()

  // Handlers
  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const handleEmail = ({ target }) => setEmail(target.value);
  const handlePassword = ({ target }) => setPassword(target.value);

  const loginOrRegister = () => {
    if (type === 'login') return  login( email, password )
    return  signup( email, password )
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setShowResult(!showResult);
    try {
      setLoading(true)
      const { user, session, error } = await loginOrRegister()
      
      if (error) throw error

      const userLogged = {
        id: user.id,
        token: session.access_token,
        email: user.email,
        isLogged: true,
      }
      localStorage.setItem('user', JSON.stringify(userLogged));
      setUser(userLogged)
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  };
  // Validation Button
  const dataIsValid = isValidEmail(email) && isValidPassword(password);

  if (loading) return <Loader size={64}/>

  return (
    <Flex align='center' justify='center'>
      <form onSubmit={onSubmit}>
          <>
            <FormControl
              isInvalid={!isValidEmail(email)}
              isRequired
              id='input-email'
            >
              <FormLabel>Email Address</FormLabel>
              {/* Autofocus problem: https://github.com/chakra-ui/chakra-ui/issues/3357 */}
              <Input
                type='email'
                placeholder='example@gmail.com'
                onChange={handleEmail}
                autoFocus
                minLength='4'
                maxLength='64'
              />
              <FormHelperText>We will never share your email.</FormHelperText>
            </FormControl>
            <FormControl
              isInvalid={!isValidPassword(password)}
              isRequired
              mt={6}
              id='input-password'
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='************'
                  onChange={handlePassword}
                  minLength='6'
                  maxLength='32'
                />
                <InputRightElement width='4.5rem'>
                  <Button
                    h='1.75rem'
                    size='sm'
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                It must contain between 8 and 32 characters. Be careful, do not
                share password.
              </FormHelperText>
            </FormControl>
            <Button
              isDisabled={!dataIsValid}
              mt='4'
              w='100%'
              type='submit'
              colorScheme='teal'
            >
              {type === 'login' ? 'Log In' : 'Register'}
            </Button>
          </>
      </form>
    </Flex>
  );
};

export default FormEmailPass;
