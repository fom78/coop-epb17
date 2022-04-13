import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  chakra,
  UnorderedList,
  ListItem,
  Text,
  Link,
} from "@chakra-ui/react";
import { useConfig } from "context/ConfigContext";



const Questions = () => {
  const {config}=useConfig()

  return (
    <Stack gap={5}>
      <Box mx="auto" textAlign={"center"} w={"95%"}>
        <chakra.h1
          color={"gray.900"}
          fontSize={{base: "4xl", md: "6xl"}}
          fontWeight={{base: "bold", md: "extrabold"}}
          lineHeight="shorter"
          mt={{base: 5, md: 16}}
          textTransform="capitalize"
        >
          Preguntas Frecuentes
        </chakra.h1>
      </Box>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{bg: "primary", color: "white"}}>
              <Box flex="1" textAlign="left">
                ¿Cuando inician las Clases?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Las Clases inician el {config.fecha_inicio_clases}.
            <UnorderedList>
              <ListItem>Turno Mañana: {config.hora_inicio_manana} Hs.</ListItem>
              <ListItem> Turno Tarde: {config.hora_inicio_tarde} Hs.</ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{bg: "primary", color: "white"}}>
              <Box flex="1" textAlign="left">
                ¿Cuál es el valor de la cuota de la cooperadora?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {`El valor es ${config.valor_cuota_anual} anual`}
            {config.valor_cuota_mensual && 
              <Box>{`Puede pagar ${config.valor_cuota_mensual} por mes, que es el valor de la cuota mensual.`}</Box>
            }
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{bg: "primary", color: "white"}}>
              <Box flex="1" textAlign="left">
                ¿Cómo podes participar con nuestra cooperadora?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Hay muchas formas en las que nos podes ayudar para poder entre todos mejorar la calidad
            educativa de la Institución. Siempre estamos trabajando en la mejora edilicia de la
            misma . Podés colaborar donando materiales o mano de obra para que podamos concretar
            esos trabajos. También participando de las jornadas solidarias para poder juntar el
            dinero y mantener la Institución en buenas condiciones.
            <UnorderedList mt={5}>
              <ListItem>Abonando mensualmente la cuota sugerida.</ListItem>
              <ListItem>
                {" "}
                Asistiendo a las reuniones para poder ser parte de la toma de decisiones.
              </ListItem>
              <ListItem>
                Colaborando cuando se solicite en algún evento para juntar fondos.
              </ListItem>
              <ListItem>Prestando servicios de: </ListItem>
              <UnorderedList>
                <ListItem>Electricidad.</ListItem>
                <ListItem>Arreglos en la Institución.</ListItem>
                <ListItem>Cortando el pasto.</ListItem>
                <ListItem> Pintando, etc.</ListItem>
              </UnorderedList>
              <ListItem>
                {" "}
                Otras formas de participar: Donando elementos para realizar sorteos.
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{bg: "primary", color: "white"}}>
              <Box flex="1" textAlign="left">
                ¿Qué es una cooperadora escolar?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack gap={5}>
              <Text>
                Las cooperadoras funcionan con el trabajo y el aporte voluntario de los padres que
                suplen necesidades de la institución en donde el estado no llega. Las cooperadoras
                han adquirido un rol central en la vida escolar y en la calidad educativa.
              </Text>
              <Text>
                La mayoría de las escuelas públicas del país cuentan con una cooperadora escolar,
                integrada por padres de alumnos y también docentes y directivos de la Institución.
              </Text>
              <Text>
                Las asociaciones cooperadoras ocupan con frecuencia lugares en donde el Estado no
                tiene presencia, pero son de vital importancia ya que permiten mejorar la calidad
                educativa, entendida como la conservación del edificio, la disponibilidad de los
                recursos didácticos y el capital humano y social de las escuelas.
              </Text>
              <Text>
                El trabajo diario que realizan los padres a través de las cooperadoras, de forma
                voluntaria, permite brindar soluciones con fondos, principalmente generados por
                ellos mismos, los problemas en las instituciones estatales del país. Las escuelas
                difícilmente sobreviven sin una buena gestión desde la dirección y una buena
                cooperadora.
              </Text>
              <Text>
                Es interesante también porque aportan otra visión, generan un control social y suman
                a la democratización en la toma de decisiones.
              </Text>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{bg: "primary", color: "white"}}>
              <Box flex="1" textAlign="left">
                Contacto
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Stack gap={5}>
              <Stack isInline alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontWeight={500}>Faceebok </Text>
                  <Text fontSize={{base: "xs", md: "md"}}>
                    (Solo Noticias/No respondemos mensajes)
                  </Text>
                </Box>
                <Link
                  isExternal
                  fontSize={{base: "xs", md: "md"}}
                  fontWeight={600}
                  href={config.facebook}
                  textAlign="center"
                >
                  Abrir Facebook
                </Link>
              </Stack>
              <Stack isInline alignItems={"center"} justifyContent={"space-between"}>
                <Box>
                  <Text fontWeight={500}>Sede Central </Text>
                  <Text fontSize={{base: "xs", md: "md"}}>
                    ({config.direccion})
                  </Text>
                </Box>
                <Link
                  isExternal
                  fontSize={{base: "xs", md: "md"}}
                  fontWeight={600}
                  href={config.direccion_google_maps}
                  textAlign="center"
                >
                  Google Maps
                </Link>
              </Stack>

              <Stack isInline alignItems={"center"} justifyContent={"space-between"}>
                <Text fontWeight={500}>Telefono</Text>
                <Link fontSize={{base: "xs", md: "md"}} fontWeight={600} href={`tel:${config.telefono_link}`}>
                {config.telefono_texto}
                </Link>
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};

export default Questions;
