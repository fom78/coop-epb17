import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Select,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import Loader from 'components/Loader';
import { useUser } from 'context/UserContext';
import { useConfig } from 'context/ConfigContext';


/**
 * FormConfig is a form to add a new pago.
 * @name FormConfig
 * @component
 * @category Form
 * @subcategory EmailPass
 * @param {String} type - Set type modal. Options are add/register.
 * @example
 * <EmptyModal title="Agregar Pago" buttonText="Agregar Pago" >
 *  <FormPago type='login' />
 * </EmptyModal>
 * @returns Return a component of React.
 */
const FormConfig = ({ type, item }) => {
  const {  editConfig } = useConfig()

  const [config, setConfig] = useState()
  const { setActualModalOpen } = useUser()

  
  // Define the submit button
  let btnProps = {}
  // set type
  switch (type) {
    case 'add':
      btnProps = {
        leyenda: 'Agregar',
        colorScheme: 'teal'
      }
      break;
    case 'edit':
      btnProps = {
        leyenda: 'Editar',
        colorScheme: 'blue'
      }
      break;
    case 'delete':
      btnProps = {
        leyenda: 'Eliminar',
        colorScheme: 'red'
      }
      break;
    default:
      btnProps = {
        leyenda: 'Agregar',
        colorScheme: 'teal'
      }
      break;
  }


  // Handlers
  const handleConfig = ({ target }) => setConfig({ ...config, [target.name]: target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    let msg = ''
    try {
      
      if (type === 'edit') {
        await editConfig(item, config)
        msg = 'Configuraciones Modificadas correctamente 👏'
      }

    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setActualModalOpen(false)

      toast.success(msg)
    }
  };

  // if (loading) return <Loader size={64} />

  return (
    <Flex align='center' justify='center'>
      <form onSubmit={onSubmit} >
        <>
          <FormControl
            // isInvalid={!isValidEmail(email)}
            isRequired
            id='input-nombre'
          >
            <FormLabel>{item}</FormLabel>
            <Input
              type='text'
              name='nombre'
              placeholder='Nombre del socio'
              onChange={handleConfig}
              // value={config.nombre}
              minLength='3'
              maxLength='64'
              disabled={type === 'delete'}
            />
            <FormHelperText>Coloque el nomre del socio.</FormHelperText>
          </FormControl>
          
          <Button
            // isDisabled={!dataIsValid}
            mt='4'
            w='100%'
            type='submit'
            colorScheme={btnProps.colorScheme}
          >
            {btnProps.leyenda}
          </Button>
        </>
      </form>
    </Flex>
  );
};

export default FormConfig
