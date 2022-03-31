import {Box, Heading} from "@chakra-ui/react";

// import StaggeredSlideFade from "../../../ui/common/StaggeredSlideFade";
import {timeSince} from 'utils/generals';
// import UserNotFound from "../UserNotFound";

import SocioCard from "./SocioCard";


const SociosTablet = ({socios, totalData, date}) => {
    
  return (
    <>
      {/* <StaggeredSlideFade> */}
        <Box as="article" borderBottomRadius="lg" borderTopRadius="lg" boxShadow={"lg"}>
          <Box
            alignItems="center"
            bg={"white"}
            display="flex"
            justifyContent={"space-between"}
            px={5}
            py={2}
          >
            <Heading color={"secondary.900"} fontSize={"xl"} fontWeight={"bold"}>
              # Resultados
            </Heading>
            <Heading color={"secondary.700"} fontSize={"md"} fontWeight={"bold"}>
              {socios.length + "/" + totalData}
            </Heading>
          </Box>

          {socios.length >= 1 ? (
            socios.map((socio) => <SocioCard key={socio.id} socio={socio} />)
          ) : (
            // <UserNotFound />
            <h1>No socio encontrado</h1>
          )}

          <Box bg={"white"} borderColor={"secondary.300"} borderTopWidth="2px" px={14} py={2}>
            <Heading
              color={"secondary.700"}
              fontSize={{base: "xs", md: "md"}}
              fontWeight={"bold"}
              textAlign="center"
            >
              Ultima actualizacion {timeSince(date)}
            </Heading>
          </Box>
        </Box>
      {/* </StaggeredSlideFade> */}
    </>
  );
};

export default SociosTablet;
