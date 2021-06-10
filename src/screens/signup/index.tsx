import React from "react";
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { postRegister } from "../../api/user-auth";
import { HTTPStatusEnum } from "../../enums/HTTPStatusEnum";
import { postLSToken } from "../../utils/tokens";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const toast = useToast();

  const history = useHistory();

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      email: e.currentTarget?.email.value,
      password: e.currentTarget?.password.value,
      first_name: e.currentTarget?.first_name.value,
      last_name: e.currentTarget?.password.value,
    };
    postRegister(payload)
      .then((response) => {
        if (response.status === HTTPStatusEnum.CREATED) {
          toast({
            title: "Sign Up Successful",
            description:
              "Signed up in successfully, please login with the credentials to proceed.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          history.push("/login");
        } else {
          Promise.reject("Something went wrong while creating user");
        }
      })
      .catch((e) => {
        const message = e?.response?.data?.message;
        toast({
          title: "Sign Up Error",
          description:
          message || "Something went wrong while signing up user please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        h="100vh"
        w="100vw"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg="#ececec"
      >
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
            required
            variant="flushed"
            placeholder="First Name"
            name="first_name"
          />
          <br />
          <Input
            required
            variant="flushed"
            placeholder="Last Name"
            name="last_name"
          />
          <br />{" "}
          <Input
            required
            variant="flushed"
            placeholder="Email"
            type="email"
            name="email"
          />
          <br />
          <Input
            required
            variant="flushed"
            placeholder="Password"
            type="password"
            name="password"
          />
          <br />
          <Button
            type="submit"
            disabled={isSubmitting}
            colorScheme="blue"
            mt="50px"
            width="100%"
          >
            Sign Up
          </Button>
          <br />
          <Link to="/login">Log In instead?</Link>
        </Flex>
      </Flex>
    </form>
  );
};

export default Signup;
