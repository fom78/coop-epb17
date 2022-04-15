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
import { useSociosRecords } from 'context/SociosRecordsContext';
import { useUser } from 'context/UserContext';
import { MdArrowDropDown } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

import { getCursos } from 'utils/generals';
import { useNavigate } from 'react-router-dom';

const cursos = getCursos()

const initialAlumne = {
  "nombre": "",
  "grado": "1A"
}
const initialSocio = {
  "nombre": '',
  "email": '',
  "telefono": '',
  "alumnes": [],
}

const socioToAddOrEdit = (socio) => {
  const { nombre, email, telefono, alumnes, id = null } = socio
  return {
    id,
    nombre,
    email,
    telefono,
    alumnes,
  }
}
/**
 * FormPago is a form to add a new pago.
 * @name FormSocio
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
const FormSocio = ({ type, socioId = null }) => {
  const { loading, sociosRecords, createSocio, editSocio, deleteLogicalSocio } = useSociosRecords()

  const [socio, setSocio] = useState(socioToAddOrEdit(sociosRecords.filter(s => s.id === socioId)[0] || initialSocio));
  const [alumne, setAlumne] = useState(initialAlumne);
  const { setActualModalOpen } = useUser()

  const navigate = useNavigate()
  useEffect(() => {
    if (type === 'add') {
      setSocio(initialSocio)
    }
    return () => { }
  }, [type])


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
    const { value } = target
    const name = target.name === 'nombreAlumne' ? 'nombre' : target.name

    setAlumne({ ...alumne, [name]: value })
    if (target.name==='nombreAlumne') {
      if (socio.nombre === '' || socio.nombre.slice(0,10)==='Familia de') {
        setSocio({ ...socio, nombre: `Familia de ${value}` })
      }
    }

  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let msg = ''
    try {
      if (type === 'add') {
        await createSocio(socio)
        msg = 'Socio agregado correctamente 👏'
      }
      if (type === 'edit') {
        await editSocio(socioId, socio)
        msg = 'Socio Modificado correctamente 👏'
      }
      if (type === 'delete') {
        await deleteLogicalSocio(socioId)
        msg = 'Socio Eliminado correctamente 👏'
      }

    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setActualModalOpen(false)
      if (type === 'add') {
        navigate('/list?periodo=todos')
      }
      toast.success(msg)
    }
  };

  const addAlumneToSocio = () => {
    setSocio({ ...socio, alumnes: [...socio.alumnes, alumne] })
    setAlumne(initialAlumne)
  }
  const deleteAlumneToSocio = (nombre) => {
    setSocio({ ...socio, alumnes: socio.alumnes.filter(a => a.nombre !== nombre) })
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
              placeholder='Nombre del socio'
              onChange={handleSocio}
              value={socio.nombre}
              minLength='3'
              maxLength='64'
              disabled={type === 'delete'}
            />
            <FormHelperText>Coloque el nomre del socio.</FormHelperText>
          </FormControl>
          <Box d={'flex'} gap={2}>
            <FormControl
              id='input-email'
            >
              <FormLabel>Email</FormLabel>
              <Input
                type='text'
                name='email'
                placeholder='Email del socio'
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
                placeholder='Nro de telefono'
                onChange={handleSocio}
                value={socio.telefono}
                minLength='1'
                maxLength='64'
                disabled={type === 'delete'}
              />
            </FormControl>

          </Box>
          {/* alumnes */}

          <FormControl
            id='input-alumne'
          >
            <FormLabel>Hijes</FormLabel>
            <Box d={'flex'} gap={2}>
              <Input
                type='text'
                name='nombreAlumne'
                placeholder='Nombre del alumno'
                onChange={handleAlumne}
                value={alumne.nombre}
                minLength='1'
                maxLength='64'
                disabled={type === 'delete'}
              />
              <Select
                type='text'
                name='grado'
                icon={<MdArrowDropDown />}
                onChange={handleAlumne}
                value={alumne.grado}
                minLength='1'
                // maxLength='64'
                w={'35%'}
                // size={'xs'}
                disabled={type === 'delete'}
              >
                {cursos.map((curso, index) => <option key={index} value={curso}>{curso}</option>)}
              </Select>
              <Button
                isDisabled={alumne.nombre.length === 0}
                onClick={addAlumneToSocio}
              >Add</Button>
            </Box>
          </FormControl>
          <Spacer h={3} />
          {(socio.alumnes && socio.alumnes.length > 0) ? socio.alumnes.map((a, index) =>
            <Box
              key={index}
              d={'flex'}
              borderColor={"secondary.300"}
              borderTopWidth="2px"
            >
              <Stack isInline w={'100%'} alignItems="center" justifyContent={"space-between"}>
                <Box alignItems="center" w={'100%'} mr={8} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                  <Box>{a.nombre}</Box>
                  <Box>{a.grado}</Box> 
                </Box>
                <Button
                colorScheme ={'red'} variant={'ghost'}
                  onClick={() => deleteAlumneToSocio(a.nombre)}
                ><FaTrash /></Button>
              </Stack>
            </Box>)
            : <p>No hay alumnos agregados!</p>
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
