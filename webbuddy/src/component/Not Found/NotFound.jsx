import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container h="90vh">
      <VStack justifyContent={"center"} h="full" spacing={"8"}>
        <RiErrorWarningFill size={"5rem"} />
        <Heading>Oops!!! 404 Page Not Found</Heading>
        <Link to="/">
          <Button colorScheme="pink" variant="link">
            Go to home
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
