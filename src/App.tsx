import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import Auth from "./routes/Auth";
import UserProvider from "./Contexts/UserContext";
import { AuthContextProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </AuthContextProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
