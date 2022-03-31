import {Stack, Text} from "@chakra-ui/react";

import Heart from 'components/icons/Heart';
import Info from 'components/icons/Info';

const AlertInfo = ({msg, type = "true"}) => {
  return (
    <Stack bg="white" boxShadow={"lg"} direction={["column", "row"]} p={{base: 3, md: 5}}>
      {type ? <Info /> : <Heart />}
      <Text fontSize={{base: "sm", md: "md"}} ml={{base: 0, md: 5}} p={2} textAlign={"justify"}>
        {msg}
      </Text>
    </Stack>
  );
};

export default AlertInfo;
