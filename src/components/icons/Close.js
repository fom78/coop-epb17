import {Box, VisuallyHidden, chakra} from "@chakra-ui/react";
import {FaTimes} from "react-icons/fa";

const Close = (props) => {
  return (
    <Box alignItems={"center"} display={"inline-flex"} justifyContent={"center"}>
      <chakra.div
        alignItems={"center"}
        bg={"primary"}
        color={"tertiary"}
        display={"inline-flex"}
        height={12}
        justifyContent={"center"}
        rounded={"full"}
        width={12}
        {...props}
      >
        <VisuallyHidden>{"Ayuda"}</VisuallyHidden>
        <FaTimes fontSize={24} />
      </chakra.div>
    </Box>
  );
};

export default Close;
