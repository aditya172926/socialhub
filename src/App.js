import logo from './logo.svg';
import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from './Components/MainLayout';
import './App.css';

function App() {
  return (
    <ChakraProvider>
        <MainLayout />
    </ChakraProvider>
  );
}

export default App;
