import {
    Button,
    Heading,
    Input,
} from "@chakra-ui/react";
import { Alchemy, Network } from "alchemy-sdk";

export const Form = ({title, userAddress, setUserAddress, isLoading, setIsLoading, setResults, setHasQueried, setTokenDataObjects, setError }) => {
    const getNFTForOwner = async () => {
        setIsLoading(true);
        setError("");

        const config = {
          apiKey: "bh2UhmQNBm9WN7V-bo-luCgnfm1VdEC2",
          network: Network.ETH_SEPOLIA,
        };
    
        const alchemy = new Alchemy(config);
        let address = userAddress.trim();
    
        if (!address) {
          setError("Please enter a valid Ethereum address or ENS name.");
          setIsLoading(false);
          return;
        }
    
        // ENS handler
        if (address.endsWith(".eth")) {
          try {
            const resolvedAddress = await alchemy.core.resolveName(address);
            if (resolvedAddress) {
              address = resolvedAddress;
            } else {
              setError("Invalid ENS name!");
              setIsLoading(false);
              return;
            }
          } catch (error) {
            setError("Error resolving ENS name.");
            setIsLoading(false);
            return;
          }
        }
    
        try {
          const data = await alchemy.nft.getNftsForOwner(address);

          if (!data || !data.ownedNfts || data.ownedNfts.length === 0) {
            setError("⚠️ No NFTs found for this address.");
            setIsLoading(false);
            return;
          }
    
          setResults(data);
          console.log(data);
    
          // 🔹 Fetch metadata for each NFT
          const tokenDataPromises = data.ownedNfts.map((nft) =>
            alchemy.nft.getNftMetadata(nft.contract.address, nft.tokenId)
          );
    
          setTokenDataObjects(await Promise.all(tokenDataPromises));
          setHasQueried(true);
        } catch (error) {
          setError("Failed to fetch token balances. Please try again.");
          console.log(error);
        }
        setIsLoading(false);
    }

    return (
        <>
            <Heading mt={42}>{title}</Heading>
            <Input
                onChange={(e) => setUserAddress(e.target.value)}
                color="black"
                w="600px"
                textAlign="center"
                p={4}
                bgColor="white"
                fontSize={24}
            />
            <Button fontSize={20} onClick={getNFTForOwner} mt={36} bgColor="blue" isDisabled={isLoading}>
                Check NFT Balances
            </Button>
        </>
    )
}