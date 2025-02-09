import { 
    Center, 
    Flex, 
    Heading, 
    Text
} from "@chakra-ui/react";

export const Header = ({ title, subtext }) => {
    return (
        <Center>
            <Flex alignItems={"center"} justifyContent="center" flexDirection={"column"}>
                <Heading mb={0} fontSize={36}>
                    {title}
                </Heading>
                <Text>
                    {subtext}
                </Text>
            </Flex>
        </Center>
    )
}