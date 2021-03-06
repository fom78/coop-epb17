import { Box, Heading as ChakraHeading, Text, chakra, Stack, Wrap, WrapItem, Spacer, Heading, FormLabel, Select, Link } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaEdit, FaCalendarCheck, FaAngleRight, FaTrash } from "react-icons/fa";

import AlertInfo from 'components/AlertInfo';
import { parseCurrency, parseMonth, timeSince } from 'utils/generals';
import { Navigate, useParams } from "react-router-dom";
import { useSociosRecords } from "context/SociosRecordsContext";
import StaggeredSlideFade from "./StaggeredSlideFade";
import EmptyModal from "./EmptyModal";
import FormPago from "./FormPago";
import FormSocio from "./FormSocio";
import { useUser } from "context/UserContext";
import { useConfig } from "context/ConfigContext";
import { IoSchool } from "react-icons/io5";

const textSize = ['.65rem', '.75rem', '.85rem', '.95rem']
const initialSocio = {
  'nombre': "",
  'pagos': [],
  'alumnes': []
}
const Socio = () => {
  const { config } = useConfig()
  const params = useParams()
  const { id } = params
  const { sociosRecords } = useSociosRecords()
  const { user } = useUser()

  const [showPeriodo, setShowPeriodo] = useState(config.periodo_actual)

  const socio = sociosRecords.filter(e => e.id === parseInt(id))[0] || { ...initialSocio, nombre: 'deleted' }

  const { nombre, alumnes, pagos = [] } = socio

  /* Verificar en que periodos fue socio */
  const periodosSiendoSocio = useMemo(
    () => {
      const periodos = config.periodos.map(periodo => {
        const periodoFounded = pagos.filter(p => parseInt(periodo) === parseInt(p.periodo))
        if (periodoFounded.length > 0) return periodo
        return 'no'
      })
      return periodos.filter(p => p !== 'no')
    }
    ,
    [pagos, config.periodos],
  );

  /* pagos filtrado por periodo */
  const pagosPorPeriodo = pagos.filter(p => p.periodo === parseInt(showPeriodo))


  const count = useMemo(
    () =>
      pagosPorPeriodo.reduce((counter, obj) => {
        counter += Number(obj.monto);

        return counter;
      }, 0),
    [pagosPorPeriodo],
  );

  // Handlers
  const handleShowPeriodo = ({ target }) => setShowPeriodo(target.value);

  if (socio.nombre === 'deleted') return <Navigate to="/list" replace={true} />

  return (
    <Stack gap={5} mb={12}>
      {(user.rol === 'admin' || user.rol === 'mod') &&
      <Box p='1' textAlign={"center"} >
        <EmptyModal title='Agregar un socio' fontSize={textSize} colorScheme={'blue'} buttonText='Agregar nuevo Socio'>
          <FormSocio type='add' />
        </EmptyModal>
      </Box>
}
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
              {/* Acciones para el Socio */}
              {(user.rol === 'admin' || user.rol === 'mod') &&
                <Box p='1' display='flex' w={['10%', '15%']} alignSelf={'center'}>
                  <EmptyModal title='Editar' buttonText={<FaEdit />} colorScheme={'blue'} variant={'outline'}>
                    <FormSocio type='edit' socioId={parseInt(id)} />
                  </EmptyModal>
                  <EmptyModal title='Eliminar' buttonText={<FaTrash />} colorScheme={'red'} variant={'outline'}>
                    <FormSocio type='delete' socioId={parseInt(id)} />
                  </EmptyModal>
                </Box>
              }
            </Box>
            <Stack alignItems={"center"} gap={2} mt={5}>
              {alumnes && alumnes.map((alumne, index) => (
                <Wrap key={index}>
                  <WrapItem alignItems="center">
                    <IoSchool color="primary" fontSize={"20px"} />
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
              {periodosSiendoSocio.length &&
                <Stack isInline alignItems={"center"} >
                  <FaCalendarCheck color="primary" fontSize={'40px'} />
                  <Text>Periodos: </Text>
                  <chakra.span
                    isTruncated
                    color="secondary.800"
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="base"
                    display='flex' w={'100%'}
                    gap={4}
                  >
                    {periodosSiendoSocio.map(p =>
                      <Link key={p} onClick={() => setShowPeriodo(p)} color={showPeriodo === p ? 'blue' : 'inherit'}>{p}</Link>
                    )}
                  </chakra.span>
                </Stack>
              }
            </Stack>
          </Box>
        </Box>
        {(user.rol === 'admin' || user.rol === 'mod') &&

          <Box p='1' justifyContent={"right"} display={'flex'} gap={4}>
            <Select
              type='text'
              name='periodo'
              // icon={<MdArrowDropDown />}
              onChange={handleShowPeriodo}
              value={showPeriodo}
              w={'35%'}
              minLength='1'
              maxLength='64'
            >
              {config.periodos.map((p, index) => <option key={index} value={p}>{p}</option>)}
            </Select>
            <EmptyModal title='Agregar un pago' fontSize={textSize} buttonText='Agregar Pago'>
              <FormPago type='add' socioId={parseInt(id)} />
            </EmptyModal>
          </Box>
        }
        <AlertInfo
          msg={
            "Con tu aporte colabor??s con el gran trabajo que realiza la Asociaci??n Cooperadora para que cada dia est?? mejorando la escuela. ??Gracias!"
          }
          type={false}
        />

        <Heading textAlign={'center'}>Periodo actual: {showPeriodo}</Heading>
        <Box>
          <Box
            alignItems="center"
            bg={"white"}
            display="flex"
            justifyContent={"space-between"}
            px={5}
            py={2}
          >
            <Box display="flex" justifyContent='space-between' w="100%" fontSize={textSize}>
              <ChakraHeading color={"secondary.900"} fontSize={textSize} fontWeight={"bold"} w={'25%'}>
                # Pagos
              </ChakraHeading>
              <ChakraHeading color={"secondary.900"} fontSize={textSize} fontWeight={"bold"} w={'25%'}>
                Tipo
              </ChakraHeading>
              <Box display={"flex"} flexDirection={'column'} textAlign={'center'} maxW={'25%'}>
                <ChakraHeading color={"secondary.700"} fontSize={textSize} fontWeight={"bold"}>
                  Total:
                </ChakraHeading>
                <ChakraHeading color={"secondary.700"} fontSize={textSize} fontWeight={"bold"} ml={3} >
                  {parseCurrency(count)}
                </ChakraHeading>
              </Box>
            </Box>
            {(user.rol === 'admin' || user.rol === 'mod') &&
              <Box p='1' display='flex' w={['10%', '15%']} w={'25%'}>
                <ChakraHeading color={"secondary.700"} fontSize={textSize} fontWeight={"bold"}>
                  Acciones
                </ChakraHeading>
              </Box>
            }
          </Box>

          {pagosPorPeriodo.sort((a, b) => a.mes < b.mes ? 1 : -1).map((pago, index) => (
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
              <Box display='flex' justifyContent='space-between' w="100%" fontSize={textSize}>
                <Text fontWeight={"500"} textTransform={"capitalize"} w={'25%'}>
                  - {parseMonth(pago.mes)}
                </Text>
                <Text fontWeight={"500"} textTransform={"capitalize"} fontSize={textSize} w={'25%'}>{pago.tipo}</Text>
                <Text fontSize={textSize} w={'25%'}> {parseCurrency(Number(pago.monto))}</Text>
              </Box>
              {(user.rol === 'admin' || user.rol === 'mod') &&
                <Box p='1' display='flex' fontSize={textSize} w={'25%'}>
                  <EmptyModal title='Editar el pago' buttonText={<FaEdit />} colorScheme={'blue'} variant={'ghost'}>
                    <FormPago type='edit' socioId={parseInt(id)} pagoId={pago.id} />
                  </EmptyModal>
                  <EmptyModal title='Eliminar el pago' buttonText={<FaTrash />} colorScheme={'red'} variant={'ghost'}>
                    <FormPago type='delete' socioId={parseInt(id)} pagoId={pago.id} />
                  </EmptyModal>
                </Box>
              }
            </Box>
          ))}

          <Box bg={"white"} borderColor={"secondary.300"} borderTopWidth="2px" px={14} py={2}>
            <ChakraHeading
              color={"secondary.700"}
              fontSize={"sm"}
              fontWeight={"bold"}
              textAlign="center"
            >
              Ultima actualizaci??n del sistema {timeSince(config.ultimo_update)}
            </ChakraHeading>
          </Box>
        </Box>
      </StaggeredSlideFade>
    </Stack>
  );
};

export default Socio;
