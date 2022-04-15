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
  Box,
} from '@chakra-ui/react';
import { MdArrowDropDown } from "react-icons/md";
import Loader from 'components/Loader';
import { useSociosRecords } from 'context/SociosRecordsContext';
import { nameMonth, tipoPagos } from 'utils/generals';
import { useUser } from 'context/UserContext';
import { useConfig } from 'context/ConfigContext';

const mesActual = new Date().getMonth() + 1


const initialPago = {
  // "periodo": 2023,
  "mes": mesActual,
  "monto": 0,
  "tipo": tipoPagos[0]
}
/**
 * FormPago is a form to add a new pago.
 * @name FormPago
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
const FormPago = ({ type, socioId, pagoId = null }) => {
  const { config } = useConfig()

  const periodos = config.periodos || []

  const [pago, setPago] = useState({...initialPago, periodo:config.periodo_actual, monto: config.valor_cuota_anual});
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
      setPago({...initialPago, periodo:config.periodo_actual, monto: config.valor_cuota_anual})
    }
  }, [pagoId, sociosRecords, config])


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
  const handlePago = ({ target }) => {
    if (target.name === 'tipo' && target.value === tipoPagos[1]) {
      return setPago({ ...pago, [target.name]: target.value, monto: config.valor_cuota_mensual })
    }
    return setPago({ ...pago, [target.name]: target.value })
};

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
        await editPago(pagoId, socioId, pago)
        msg = 'Pago Modificado correctamente 👏'
      }
      if (type === 'delete') {
        await deletePago(pagoId, socioId)
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
        <Box d={'flex'} gap={3}>
        <FormControl
            // isInvalid={!isValidEmail(email)}
            isRequired
            id='input-periodo'
          >
            <FormLabel>Periodo</FormLabel>
            <Select
              type='text'
              name='periodo'
              icon={<MdArrowDropDown />}
              onChange={handlePago}
              value={pago.periodo || config.periodo_actual}
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            >
              {periodos.map((p, index) => <option key={index} value={p}>{p}</option>)}
            </Select>
          </FormControl>
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

        </Box>

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

export default FormPago;
