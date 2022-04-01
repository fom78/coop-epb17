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
import Loader from 'components/Loader';
import { useSociosRecords } from 'context/SociosRecordsContext';

const initialPago = {
  "periodo": 2022,
  "mes": 12,
  "monto":0,
  "tipo":"Completo"
}
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
const FormAddPago = ({ type, socioId }) => {
  const [pago, setPago] = useState(initialPago);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false)

  const { createPago } = useSociosRecords()

  // Handlers
  const handlePago = ({ target }) => setPago({...pago, [target.name]:target.value});

  const onSubmit = async (event) => {
    event.preventDefault();
    setShowResult(!showResult);
    try {
      setLoading(true)
      await createPago({...pago, 'socio_id':socioId})
      
      
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  };
  // // Validation Button
  // const dataIsValid = isValidEmail(email) && isValidPassword(password);

  if (loading) return <Loader size={64}/>

  return (
    <Flex align='center' justify='center'>
      <form onSubmit={onSubmit}>
          <>
            <FormControl
              // isInvalid={!isValidEmail(email)}
              isRequired
              id='input-email'
            >
              <FormLabel>Monto</FormLabel>
              {/* Autofocus problem: https://github.com/chakra-ui/chakra-ui/issues/3357 */}
              <Input
                type='text'
                name='monto'
                placeholder='0000'
                onChange={handlePago}
                autoFocus
                minLength='1'
                maxLength='64'
              />
              <FormHelperText>We will never share your email.</FormHelperText>
            </FormControl>
            
            <Button
              // isDisabled={!dataIsValid}
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

export default FormAddPago;
