import { Box, Heading, Stack } from "@chakra-ui/react";
import EmptyModal from "components/EmptyModal";
import FormSocio from "components/FormSocio";
import SociosTablet from "components/SociosTablet";
import { useSociosRecords } from "context/SociosRecordsContext";

export function ListSocios() {
  const { sociosRecords } = useSociosRecords()
  const date = Date.now()

  return (
    <>
      <Stack gap={{ base: 3, md: 5 }}>
        <Box textAlign={"center"}>Listado de Socios</Box>
        <Heading textAlign={"center"}>Listado de Socios</Heading>
        <Box p='1' textAlign={"right"}>
          <EmptyModal title='Agregar un pago' buttonText='Nuevo Socio'>
            <FormSocio type='add' />
          </EmptyModal>
        </Box>
        <SociosTablet date={date} totalData={sociosRecords.length} socios={sociosRecords} />
      </Stack>
    </>
  )
}
