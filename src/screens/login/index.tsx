import React, { FormEvent, FormEventHandler } from "react";
import useAuth from "../../hooks/useAuth";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    const credentials = {
      email: e.currentTarget?.email.value,
      password: e.currentTarget?.password.value,
    };
    setIsSubmitting(true);
    loginUser(credentials, {
      onErrorCallback: () => {
        setIsSubmitting(false);
      },
      onSuccessCallback: () => {
        setIsSubmitting(false);
      },
    });
  }, []);

  return (
    <Flex
      h="100vh"
      w="100vw"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="#ececec"
    >
      <form onSubmit={handleSubmit}>
        <Flex
          h="500px"
          w="500px"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          p="40px"
          borderRadius="20px"
          bg="white"
        >
          <Input
            variant="flushed"
            placeholder="Email"
            type="email"
            name="email"
          />
          <br />
          <Input
            variant="flushed"
            placeholder="Password"
            type="password"
            name="password"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            colorScheme="blue"
            mt="50px"
            width="100%"
          >
            Login
          </Button>
          <br />
          <Link to="/signup">Sign up instead?</Link>
        </Flex>
        <br />
      </form>
    </Flex>
  );
};

export default Login;
