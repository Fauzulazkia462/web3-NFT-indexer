import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { Header } from "./components/Header/Header";
import { Form } from "./components/Form/Form";
import { Results } from "./components/Results/Results";

const App = () => {
  const [userAddress, setUserAddress] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Box w="100vw">
      <Header title="NFT Indexer" subtext="Plug in an address and this website will return all of its NFT balances!" />

      <Flex w="100%" flexDirection="column" alignItems="center" justifyContent={"center"}>
        <Form 
          title="Get all the ERC-721 tokens of this address:" 
          userAddress={userAddress} setUserAddress={setUserAddress} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
          setResults={setResults}
          setHasQueried={setHasQueried}
          setTokenDataObjects={setTokenDataObjects}
          setError={setError}
        />

        {error && (
          <Text color="red" mt={4}>
            {error}
          </Text>
        )}

        <Results 
          title="NFT balances:"
          isLoading={isLoading}
          hasQueried={hasQueried}
          results={results}
          tokenDataObjects={tokenDataObjects}
        />
        
      </Flex>
    </Box>
  );
}

export default App;