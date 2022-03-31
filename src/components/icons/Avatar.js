import {Avatar as ChakaraAvatar} from "@chakra-ui/react";

const Avatar = ({...props}) => {
  return <ChakaraAvatar bg={"primary"} color="tertiary" {...props} />;
};

export default Avatar;
