import { Box, Heading, Select, Stack } from "@chakra-ui/react";
import EmptyModal from "components/EmptyModal";
import FormSocio from "components/FormSocio";
import SociosTablet from "components/SociosTablet";
import { useConfig } from "context/ConfigContext";
import { useSociosRecords } from "context/SociosRecordsContext";
import { useUser } from "context/UserContext";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const textSize = ['.95rem', '1.15rem', '1.35rem', '1.35rem']


export function ListSocios() {
  const { config } = useConfig()
  const { sociosRecords } = useSociosRecords()
  const { user } = useUser()

  const [searchParams] = useSearchParams({});
  const periodo = searchParams.get("periodo");

  const [showPeriodo, setShowPeriodo] = useState(config.periodo_actual)

  useEffect(() => {
    if (searchParams.get("periodo")) {
      setShowPeriodo(searchParams.get("periodo"))
    }
  
    return () => {
      setShowPeriodo(config.periodo_actual)
    }
  }, [searchParams, config])
  

  /* Verificar en que periodos fue socio */
  const socioEnPeriodoActual = useMemo(
    () => {
      const socioEnPeriodo = sociosRecords.map(socio => {

        const periodoFounded = socio.pagos.filter(p => parseInt(showPeriodo) === parseInt(p.periodo))
        if (periodoFounded.length > 0) return socio
        return 'no'
      })
      return socioEnPeriodo.filter(s => s !== 'no')
    }
    ,
    [sociosRecords, showPeriodo],
  );

  const handleShowPeriodo = ({ target }) => setShowPeriodo(target.value);

  return (
    <>
      <Stack gap={{ base: 3, md: 5 }}>
        <Heading fontSize={textSize} textAlign={"center"}>Listado de Socios {showPeriodo === 'todos' ? 'Historico ( Todos los periodos )' : showPeriodo}</Heading>
        {(user.rol === 'admin' || user.rol === 'mod') &&
          <Box p='1' textAlign={"right"} display={'flex'} gap={4}>
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
              <option key={'todos'} value={'todos'}>Todos</option>
              {config.periodos.map((p, index) => <option key={index} value={p}>{p}</option>)}
            </Select>
            <EmptyModal title='Agregar un socio' buttonText='Nuevo Socio'>
              <FormSocio type='add' />
            </EmptyModal>
          </Box>
        }
        <SociosTablet  socios={showPeriodo==='todos' ? sociosRecords : socioEnPeriodoActual} />
      </Stack>
    </>
  )
}
