import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '@fontsource/poppins'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  components: {
    Steps,
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);