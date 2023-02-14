import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './app/store';
import theme from './theme/theme';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
