import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
} from '@chakra-ui/react';
import { MdArrowDropDown } from "react-icons/md";
import Loader from 'components/Loader';
import { useSociosRecords } from 'context/SociosRecordsContext';
import { nameMonth, tipoPagos } from 'utils/generals';
import { useUser } from 'context/UserContext';

const mesActual = new Date().getMonth() + 1

const initialPago = {
  "periodo": 2022,
  "mes": mesActual,
  "monto": 0,
  "tipo": tipoPagos[0]
}
/**
 * FormAddPago is a form to add a new pago.
 * @name FormAddPago
 * @component
 * @category Form
 * @subcategory EmailPass
 * @param {String} type - Set type modal. Options are add/register.
 * @example
 * <EmptyModal title="Agregar Pago" buttonText="Agregar Pago" >
 *  <FormAddPago type='login' />
 * </EmptyModal>
 * @returns Return a component of React.
 */
const FormAddPago = ({ type, socioId, pagoId = null }) => {
  const [pago, setPago] = useState(initialPago);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false)
  const { setActualModalOpen } = useUser()

  const { createPago, editPago, deletePago, sociosRecords } = useSociosRecords()

  useEffect(() => {
    const socio = sociosRecords.filter(s => s.id === socioId)[0]
    if (pagoId) {
      const pagoToEditOrDelete = socio.pagos.filter(p => p.id === pagoId)[0]
      setPago(pagoToEditOrDelete)
    }
  
    return () => {
      
    }
  }, [pagoId, sociosRecords])
  

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
  const handlePago = ({ target }) => setPago({ ...pago, [target.name]: target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    setShowResult(!showResult);
    let msg = ''
    try {
      setLoading(true)
      if (type === 'add') {
        await createPago({ ...pago, 'socio_id': socioId })
        msg = 'Pago agregado correctamente 👏'
      }
      if (type === 'edit') {
        await editPago( pagoId, socioId, pago )
        msg = 'Pago Modificado correctamente 👏'
      }
      if (type === 'delete') {
        await deletePago( pagoId, socioId )
        msg = 'Pago Eliminado correctamente 👏'
      }

    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
      setActualModalOpen(false)

      toast.success(msg)
    }
  };
  // // Validation Button
  // const dataIsValid = isValidEmail(email) && isValidPassword(password);

  if (loading) return <Loader size={64} />

  return (
    <Flex align='center' justify='center'>
      <form onSubmit={onSubmit} >
        <>
          <FormControl
            // isInvalid={!isValidEmail(email)}
            isRequired
            id='input-mes'
          >
            <FormLabel>Mes</FormLabel>
            <Select
              type='text'
              name='mes'
              icon={<MdArrowDropDown />}
              onChange={handlePago}
              value={pago.mes}
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            >
              {nameMonth.map((mes, index) => <option key={index} value={index + 1}>{mes}</option>)}
            </Select>
            <FormHelperText>Seleccione un mes.</FormHelperText>
          </FormControl>
          <FormControl
            // isInvalid={!isValidEmail(email)}
            isRequired
            id='input-tipo'
          >
            <FormLabel>Tipo</FormLabel>
            <Select
              type='text'
              name='tipo'
              icon={<MdArrowDropDown />}
              onChange={handlePago}
              value={pago.tipo}
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            >
              {tipoPagos.map((tipo, index) => <option key={index} value={tipo}>{tipo}</option>)}
            </Select>
          </FormControl>
          <FormControl
            // isInvalid={!isValidEmail(email)}
            isRequired
            id='input-monto'
          >
            <FormLabel>Monto</FormLabel>
            {/* Autofocus problem: https://github.com/chakra-ui/chakra-ui/issues/3357 */}
            <Input
              type='text'
              name='monto'
              placeholder='0000'
              onChange={handlePago}
              value={pago.monto}
              autoFocus
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            />
            <FormHelperText>We will never share your email.</FormHelperText>
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

export default FormAddPago;
