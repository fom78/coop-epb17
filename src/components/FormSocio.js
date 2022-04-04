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
} from '@chakra-ui/react';
import { MdArrowDropDown } from "react-icons/md";
import Loader from 'components/Loader';
import { useSociosRecords } from 'context/SociosRecordsContext';
import { useUser } from 'context/UserContext';

const initialAlumne = {
  "nombre": "",
  "grado": "1A"
}
const initialSocio = {
  "nombre": 'Familia de ...',
  "email": 'email',
  "telefono": '999999',
  "alumnes": []
}
/**
 * FormAddPago is a form to add a new pago.
 * @name FormSocio
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
const FormSocio = ({ type, socioId = null }) => {
  const [socio, setSocio] = useState(initialSocio);
  const [alumne, setAlumne] = useState(initialAlumne);
  const { setActualModalOpen } = useUser()

  const { loading, sociosRecords, createSocio } = useSociosRecords()

  // useEffect(() => {
  //   const socio = sociosRecords.filter(s => s.id === socioId)[0]
  //   if (pagoId) {
  //     const pagoToEditOrDelete = socio.pagos.filter(p => p.id === pagoId)[0]
  //     setPago(pagoToEditOrDelete)
  //   }
  
  //   return () => {
      
  //   }
  // }, [pagoId, sociosRecords])
  

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
  const handleSocio = ({ target }) => setSocio({ ...socio, [target.name]: target.value });
  const handleAlumne = ({ target }) => {
    const {value} = target
    const name = target.name === 'nombreAlumne' ? 'nombre': target.name

    setAlumne({ ...alumne, [name]:value })
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let msg = ''
    try {
      if (type === 'add') {
        await createSocio(socio)
        console.log('add....', socio);
        msg = 'Pago agregado correctamente 👏'
      }
      if (type === 'edit') {
        // await editPago( pagoId, socioId, pago )
        msg = 'Pago Modificado correctamente 👏'
      }
      if (type === 'delete') {
        // await deletePago( pagoId, socioId )
        msg = 'Pago Eliminado correctamente 👏'
      }

    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setActualModalOpen(false)

      toast.success(msg)
    }
  };

  const addAlumneToSocio = () => {
    setSocio({...socio, alumnes: [...socio.alumnes, alumne]})
    setAlumne(initialAlumne)
  }
  const deleteAlumneToSocio = (nombre) => {
    setSocio({...socio, alumnes: socio.alumnes.filter(a => a.nombre !== nombre)})
  }
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
            id='input-nombre'
          >
            <FormLabel>Nombre</FormLabel>
            <Input
              type='text'
              name='nombre'
              onChange={handleSocio}
              value={socio.nombre}
              minLength='3'
              maxLength='64'
              disabled={type === 'delete'}
            />
            <FormHelperText>Coloque el nomre del socio.</FormHelperText>
          </FormControl>
          <FormControl
            id='input-email'
          >
            <FormLabel>Email</FormLabel>
            <Input
              type='text'
              name='email'
              onChange={handleSocio}
              value={socio.email}
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            />
          </FormControl>
          <FormControl
            // isInvalid={!isValidEmail(email)}
            id='input-telefono'
          >
            <FormLabel>Telefono</FormLabel>
            <Input
              type='text'
              name='telefono'
              onChange={handleSocio}
              value={socio.telefono}
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            />
          </FormControl>
          {/* alumnes */}
          
          <FormControl
            id='input-alumne'
          >
            <FormLabel>Hijes</FormLabel>
            <Box d={'flex'}>
            <Input
              type='text'
              name='nombreAlumne'
              onChange={handleAlumne}
              value={alumne.nombre}
              minLength='1'
              maxLength='64'
              disabled={type === 'delete'}
            />
          <Button
            isDisabled={alumne.nombre.length === 0}
            onClick={addAlumneToSocio}
          >Add</Button>
          </Box>
          </FormControl>
          {socio.alumnes && socio.alumnes.map((a, index) => 
            <Box d={'flex'}>
              <p key={index}>{a.nombre}</p>
              <Button
            onClick={()=>deleteAlumneToSocio(a.nombre)}
          >X</Button>
            </Box>)
          }
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

export default FormSocio;
