import { ChakraProvider, Container } from '@chakra-ui/react'
import { SociosRecordsContextProvider } from 'context/SociosRecordsContext'
import { UserContextProvider } from 'context/UserContext'
import { ConfigContextProvider } from 'context/ConfigContext'
import Footer from '../layout/footer/Footer'
import NavBar from '../layout/navbar/NavBar'
import AllRoutes from './Routes'
import theme from './theme'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
      <ConfigContextProvider>
        <SociosRecordsContextProvider>
          <Container  overflow={'hidden'} w={['100%']} >
            <NavBar />
            <AllRoutes />
            <Footer />
            <Toaster />
          </Container>
        </SociosRecordsContextProvider>
      </ConfigContextProvider>
      </UserContextProvider>
    </ChakraProvider>
  )
}

export default App