import {Box, Heading, Text} from "@chakra-ui/react";
import Close from "./icons/Close";


const SocioNotFound = () => {
  return (
    <Box
      alignItems="center"
      bg={"white"}
      borderTop={"2px"}
      borderTopColor={"secondary.300"}
      px={6}
      py={10}
      textAlign="center"
    >
      <Box alignItems={"center"} display={"inline-flex"} justifyContent={"center"}>
        <Close />
      </Box>
      <Heading as="h2" mb={2} mt={6} size="xl">
        Sin registros del usuario
      </Heading>
      <Text color={"secondary.900"}>
        No encontramos un nombre que coincidieran, asegúrate de que el nombre de la persona esté
        bien escrito y tengan el formato correcto.
      </Text>
      <Text color={"secondary.900"} fontWeight={"semibold"} mt={3}>
        Utilizá palabras más genéricas o menos palabras
      </Text>
    </Box>
  );
};

export default SocioNotFound;
