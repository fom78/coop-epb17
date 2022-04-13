import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import toast from "react-hot-toast";

import { useConfig } from "context/ConfigContext";
import { useUser } from "context/UserContext";
import { useState } from "react";

export function Admin() {
  const { config, editConfig } = useConfig()
  const { user } = useUser()

  const [item, setItem] = useState()
  const [showEditForm, setShowEditForm] = useState(false)
  const [valorItemToEdit, setValorItemToEdit] = useState('')


  const confisArray = Object.keys(config)

  const handleEdit = (it) => {
    setItem(it)
    setShowEditForm(true)
    setValorItemToEdit(config[it])
  }

  const handleValorItemToEdit = ({ target }) => setValorItemToEdit(target.value)

  const onSubmit = async (event) => {
    event.preventDefault();
    let msg = ''
    try {

      await editConfig(item, valorItemToEdit)
      msg = 'Configuraciones Modificadas correctamente 👏'

    } catch (error) {
      alert(error.error_description || error.message)
    } finally {

      toast.success(msg)
    setShowEditForm(false)

    }
  };

  return (
    <>
      <Stack gap={{ base: 3, md: 5 }}>
        <Heading textAlign={"center"}>Configuraciones del Sistema</Heading>
        {showEditForm && 
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
                  onChange={handleValorItemToEdit}
                  value={valorItemToEdit}
                  minLength='3'
                  maxLength='64'
                />
                <FormHelperText>Coloque el nuevo valor</FormHelperText>
              </FormControl>

              <Button
                mt='4'
                w='100%'
                type='submit'
                colorScheme='blue'
              >
                Editar
              </Button>
            </>
          </form>
        </Flex>
      }
        <Box>
          {confisArray.map((c, index) => <Box key={index}>{c} - {config[c]} <Button onClick={() => handleEdit(c)}>edit</Button> </Box>)}


        </Box>
      </Stack>
    </>
  )
}
