import {Heading, Box, Stack, Text, Wrap, WrapItem, IconButton} from "@chakra-ui/react";
import {FaChevronRight, FaUser} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Avatar from 'components/icons/Avatar';

const SocioCard = ({socio}) => {

  const {
    nombre,
    id,
  } = socio
  const navigate = useNavigate();

  const handlerClick = () => {
    navigate(`./socio/${id}`);
    console.log('algooo');
  };

  return (
    <Box
      _hover={{
        bgGradient: "linear(to-r, transparent, secondary.200)",
      }}
      alignSelf={{base: "center", lg: "flex-start"}}
      bg={"white"}
      borderColor={"secondary.300"}
      borderTopWidth="2px"
      cursor={"pointer"}
      p={5}
      onClick={handlerClick}
      onKeyPress={handlerClick}
    >
      <Stack isInline alignItems="center" justifyContent={"space-between"}>
        <Box alignItems="center" display={"flex"} flexDirection={"row"}>
          <Avatar nombre={nombre} size="md" />
          <Box alignItems="left" gap={0} ml={3}>
            <Heading color="primary" fontWeight={"semibold"} size={"md"} textTransform="capitalize">
              {nombre}
            </Heading>
            <Stack isInline alignItems={"center"} mt={1}>
              <FaUser color="primary" fontSize={12} />
              <Text color="primary" fontSize="13" fontWeight={"500"}>
                alguna data
              </Text>
            </Stack>
            {/* {course.length > 0 && (
              <Wrap>
                <WrapItem alignItems="center">
                  <Box bg={"pink.500"} minH={"6px"} ml={"3px"} rounded="full" w={"6px"} />
                  <Text
                    color="primary"
                    fontSize="13"
                    fontWeight={"500"}
                    ml={3}
                    textTransform={"capitalize"}
                  >
                    {course}
                  </Text>
                </WrapItem>
              </Wrap>
            )} */}
          </Box>
        </Box>
        <IconButton
          aria-label={`Enter a card ${nombre}`}
          color={"primary"}
          colorScheme="transparent"
          icon={<FaChevronRight />}
          rounded="full"
          roundedLeft={"full"}
        />
      </Stack>
    </Box>
  );
};

export default SocioCard;
