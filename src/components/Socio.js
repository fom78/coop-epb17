import { Box, Heading as ChakraHeading, Text, chakra, Stack, Wrap, WrapItem, Spacer } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { FaEdit, FaUser, FaChalkboardTeacher, FaAngleRight, FaTrash } from "react-icons/fa";

import AlertInfo from 'components/AlertInfo';
import { parseCurrency, parseMonth } from 'utils/generals';
import { useParams } from "react-router-dom";
import { useSociosRecords } from "context/SociosRecordsContext";
import StaggeredSlideFade from "./StaggeredSlideFade";
import EmptyModal from "./EmptyModal";
import FormAddPago from "./FormAddPago";
import FormSocio from "./FormSocio";

const Socio = () => {

  const params = useParams()
  const { id } = params
  const { sociosRecords } = useSociosRecords()

  
  const socio = sociosRecords.filter(e => e.id === parseInt(id))

  const { nombre, alumnes, pagos } = socio[0]

  const count = useMemo(
    () =>
      pagos.reduce((counter, obj) => {
        counter += Number(obj.monto);

        return counter;
      }, 0),
    [pagos],
  );

   return (
    <Stack gap={5} mb={12}>
      <StaggeredSlideFade>
        <Box mt={{ base: "none", sm: 8, lg: 12 }} mx="auto" py={18}>
          <Box mx="auto" textAlign={"center"} w={"95%"}>
            <Box d={'flex'} justifyContent={'center'} >
              <chakra.h1
                color={"gray.900"}
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={{ base: "bold", md: "extrabold" }}
                lineHeight="shorter"
                mb={3}
                textTransform="capitalize"
                pr={3}
                alignSelf={'center'}
              >
                {nombre}
              </chakra.h1>
              <Box p='1' display='flex' w={['10%','15%']} alignSelf={'center'}>
                  <EmptyModal title='Editar' buttonText={<FaEdit />} colorScheme ={'blue'} variant={'outline'}>
                    <FormSocio type='edit' socioId={parseInt(id)} />
                  </EmptyModal>
                  <EmptyModal title='Eliminar' buttonText={<FaTrash />} colorScheme={'red'} variant={'outline'}>
                    <FormSocio type='delete' socioId={parseInt(id)} />
                  </EmptyModal>
                </Box>
            </Box>
            <Stack alignItems={"center"} gap={2} mt={5}>
              {alumnes && alumnes.map((alumne, index) => (
                <Wrap key={index}>
                  <WrapItem alignItems="center">
                    <FaChalkboardTeacher color="primary" fontSize={"20px"} />
                    <chakra.p
                      isTruncated
                      color="secondary.800"
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="base"
                      maxW={{ base: "320px", md: "800px" }}
                      ml={2}
                      textTransform="capitalize"
                    >
                      {alumne.nombre}
                    </chakra.p>
                    <Spacer />
                    <FaAngleRight color="primary" fontSize={"20px"} />
                    <chakra.p
                      isTruncated
                      color="secondary.800"
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="base"
                      maxW={{ base: "320px", md: "800px" }}
                      // ml={1}
                      textTransform="capitalize"
                    >
                      {alumne.grado}
                    </chakra.p>
                  </WrapItem>
                </Wrap>
              ))}
              <Stack isInline alignItems={"center"}>
                <FaUser color="primary" fontSize={15} />
                <chakra.p
                  isTruncated
                  color="secondary.800"
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="base"
                >
                  alguna data
                </chakra.p>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box p='1' textAlign={"right"}>
          <EmptyModal title='Agregar un pago' buttonText='Agregar Pago'>
            <FormAddPago type='add' socioId={parseInt(id)} />
          </EmptyModal>
        </Box>

        <AlertInfo
          msg={
            "Con tu aporte colaborás con el gran trabajo que realiza la Asociación Cooperadora para que cada dia esté mejorando la escuela. ¡Gracias!"
          }
          type={false}
        />

        <Box>
          <Box
            alignItems="center"
            bg={"white"}
            display="flex"
            justifyContent={"space-between"}
            px={5}
            py={2}
          >
            <Box display="flex" justifyContent='space-between' w="100%">
              <ChakraHeading color={"secondary.900"} fontSize={"lg"} fontWeight={"bold"}>
                # Pagos
              </ChakraHeading>
              <ChakraHeading color={"secondary.900"} fontSize={"lg"} fontWeight={"bold"}>
                Tipo
              </ChakraHeading>
              <Box display={"flex"}>
                <ChakraHeading color={"secondary.700"} fontSize={"md"} fontWeight={"bold"}>
                  Total:
                </ChakraHeading>
                <ChakraHeading color={"secondary.700"} fontSize={"md"} fontWeight={"bold"} ml={3}>
                  {parseCurrency(count)}
                </ChakraHeading>
              </Box>
            </Box>
            <Box p='1' display='flex' w={['10%','15%']}>
              <ChakraHeading color={"secondary.700"} fontSize={"md"} fontWeight={"bold"}>
                Acciones
              </ChakraHeading>
            </Box>
          </Box>

          {pagos.sort((a, b) => a.mes < b.mes ? 1 : -1).map((pago, index) => (
            <Box
              key={index}
              _hover={{
                bgGradient: "linear(to-r, transparent, secondary.200)",
              }}
              alignItems="center"
              alignSelf={{ base: "center", lg: "flex-start" }}
              bg={"white"}
              borderColor={"secondary.300"}
              borderTopWidth="2px"
              display="flex"
              justifyContent={"space-between"}
              p={5}
              py={2}

            >
              <Box display='flex' justifyContent='space-between' w="100%">
                <Text fontWeight={"500"} textTransform={"capitalize"}>
                  - {parseMonth(pago.mes)}
                </Text>
                <Text fontWeight={"500"} textTransform={"capitalize"}>{pago.tipo}</Text>
                <Text> {parseCurrency(Number(pago.monto))}</Text>
              </Box>
              <Box p='1' display='flex' w={['10%','15%']}>
                <EmptyModal title='Editar el pago' buttonText={<FaEdit />} colorScheme ={'blue'} variant={'ghost'}>
                  <FormAddPago type='edit' socioId={parseInt(id)} pagoId={pago.id} />
                </EmptyModal>
                <EmptyModal title='Eliminar el pago' buttonText={<FaTrash />} colorScheme ={'red'} variant={'ghost'}>
                  <FormAddPago type='delete' socioId={parseInt(id)} pagoId={pago.id} />
                </EmptyModal>
              </Box>
            </Box>
          ))}

          <Box bg={"white"} borderColor={"secondary.300"} borderTopWidth="2px" px={14} py={2}>
            <ChakraHeading
              color={"secondary.700"}
              fontSize={"sm"}
              fontWeight={"bold"}
              textAlign="center"
            >
              Recueda que el sistema se actualiza todos los viernes
            </ChakraHeading>
          </Box>
        </Box>
      </StaggeredSlideFade>
    </Stack>
  );
};

export default Socio;
