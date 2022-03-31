import { Box, chakra, FormLabel, IconButton, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { BsFillCursorFill } from "react-icons/bs";
import { useMemo, useRef, useState } from "react";
import AlertInfo from "components/AlertInfo";
import SociosTablet from "components/SociosTablet";
import { useSociosRecords } from "context/SociosRecordsContext";
import Loader from "components/Loader";


export function Home() {
  const { sociosRecords, fetchingSocios } = useSociosRecords()
  const date = Date.now()
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const matches = useMemo(() => {
    const norma = search
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase();

    return sociosRecords.filter((socio) => socio.nombre.toLowerCase().includes(norma));
  }, [sociosRecords, search]);

  const inputRef = useRef(null);

  const handlerSumbit = (e) => {
    e.preventDefault();
    setSearch(inputValue);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  if (fetchingSocios) return <Loader />
  return (
      <>
        <Stack gap={{ base: 3, md: 5 }}>
          <Box mt={{ base: "none", sm: 8, lg: 12 }} py={{ base: 0, sm: 5 }}>
            <Box textAlign={"center"} w={"95%"}>
              <chakra.h1
                color={"gray.900"}
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight={{ base: "bold", md: "extrabold" }}
                lineHeight="shorter"
                mb={3}
              >
                Cooperadora
              </chakra.h1>

              <chakra.p color="secondary.800" fontSize={{ base: "xs", md: "xl" }} lineHeight="base">
                Escuela Primaria N° 17 de Campana
              </chakra.p>
            </Box>
          </Box>
          <AlertInfo
              msg={
                "Hola! Bienvenido a la web de la Cooperadora, aqui podras encontrar diferentes preguntas sobre la misma y un sistema donde podras buscar tus pagos de cuota societaria."
              }
            />
          <Box
            as={"form"}
            bg="white"
            boxShadow={"lg"}
            mx={2}
            pb={0}
            pt={3}
            px={3}
            onSubmit={handlerSumbit}
          >
            <FormLabel color={"primary"}>Buscar un Socio : </FormLabel>
            <InputGroup position="relative" size="lg" w="full" zIndex="initial">
              <Input
                ref={inputRef}
                _focus={{ borderColor: "primary" }}
                _placeholder={{ color: "secondary.600", fontSize: { base: "sm", md: "md" } }}
                autoComplete="off"
                colorScheme={"secondary"}
                placeholder="Juan Gonzales"
                required={true}
                roundedRight={0}
                size="lg"
                type="text"
                value={inputValue}
                variant={"filled"}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <InputLeftElement ml={4} w="auto" zIndex={0}>
                <FaSearch />
              </InputLeftElement>
              <IconButton
                aria-label="Search database"
                icon={<BsFillCursorFill fontSize={24} />}
                type="submit"
              />
            </InputGroup>
            <FormLabel color={"secondary.700"} fontSize={"xs"} ml={2} mt={1}>
              Para iniciar la busqueda en nuestro sistema ingrese el nombre de un socio
            </FormLabel>
          </Box>

          {search.length && <SociosTablet date={date} totalData={sociosRecords.length} socios={matches} />}
          {/* {search.length && matches.map(e => <h1>{e.nombre}</h1>)} */}
        </Stack>
      </>
  )
}
