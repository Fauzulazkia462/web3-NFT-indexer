import {
    Box,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Text,
    Spinner,
} from "@chakra-ui/react";

export const Results = ({title, isLoading, hasQueried, results, tokenDataObjects}) => {
    return (
        <>
            <Heading my={36}>{title}</Heading>
            {isLoading ? (
                <Flex>
                <Text>Loading...</Text>
                <Spinner size="xl" />
                </Flex>
            ) : hasQueried ? (
                <SimpleGrid w={"90vw"} columns={[1, 2, 3, 4]} spacing={6}>
                {results.ownedNfts.map((e, i) => (
                    <Flex
                    flexDir={"column"}
                    color="white"
                    bg="blue"
                    w={"20vw"}
                    p={4}
                    borderRadius="lg"
                    overflow="hidden"
                    textAlign="center"
                    >
                    <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                        <b>Name:</b> ${tokenDataObjects[i]?.title || tokenDataObjects[i]?.contract?.symbol || "No Name"}
                    </Box>
                    {tokenDataObjects[i]?.rawMetadata?.image && (
                        <Image src={tokenDataObjects[i].rawMetadata?.image} boxSize="50px" mx="auto" mt={2} />
                    )}
                    </Flex>
                ))}
                </SimpleGrid>
            ) : (
                <Text>Please make a query! This may take a few seconds...</Text>
            )}
        </>
    )
}