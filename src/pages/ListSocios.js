import { Box, Heading, Stack } from "@chakra-ui/react";
import EmptyModal from "components/EmptyModal";
import FormSocio from "components/FormSocio";
import SociosTablet from "components/SociosTablet";
import { useSociosRecords } from "context/SociosRecordsContext";
import { useUser } from "context/UserContext";

export function ListSocios() {
  const { sociosRecords } = useSociosRecords()
  const { user } = useUser()

  return (
    <>
      <Stack gap={{ base: 3, md: 5 }}>
        <Heading textAlign={"center"}>Listado de Socios</Heading>
        {(user.rol === 'admin' || user.rol === 'mod') &&
          <Box p='1' textAlign={"right"}>
            <EmptyModal title='Agregar un pago' buttonText='Nuevo Socio'>
              <FormSocio type='add' />
            </EmptyModal>
          </Box>
        }
        <SociosTablet totalData={sociosRecords.length} socios={sociosRecords} />
      </Stack>
    </>
  )
}
