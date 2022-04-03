import { ChakraProvider } from '@chakra-ui/react'
import { SociosRecordsContextProvider } from 'context/SociosRecordsContext'
import { UserContextProvider } from 'context/UserContext'
import Footer from '../layout/footer/Footer'
import NavBar from '../layout/navbar/NavBar'
import AllRoutes from './Routes'
import theme from './theme'
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <SociosRecordsContextProvider>
          <NavBar />
          <AllRoutes />
          <Footer />
          <Toaster />
        </SociosRecordsContextProvider>

      </UserContextProvider>
    </ChakraProvider>
  )
}

export default App