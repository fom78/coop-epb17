import { Stack } from "@chakra-ui/react";
import SociosTablet from "components/SociosTablet";
import { useSociosRecords } from "context/SociosRecordsContext";

export function ListSocios() {
  const { sociosRecords } = useSociosRecords()
  const date = Date.now()

  return (
    <Stack gap={{ base: 3, md: 5 }}>
      <SociosTablet date={date} totalData={sociosRecords.length} socios={sociosRecords} />
    </Stack>
  )
}
