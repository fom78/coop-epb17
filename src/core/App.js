import { ChakraProvider } from '@chakra-ui/react'
import { SociosRecordsContextProvider } from 'context/SociosRecordsContext'
import { UserContextProvider } from 'context/UserContext'
import Footer from '../layout/footer/Footer'
import NavBar from '../layout/navbar/NavBar'
import AllRoutes from './Routes'

// const theme = {
//   styles: {
//     global: {
//       'html, body': {
//         color: 'blue.600',
//         lineHeight: 'tall',
//         background: 'red.400'
//       },
//       a: {
//         color: 'teal.500',
//       },
//     },
//   },
// }

function App() {

  return (
    <ChakraProvider>
      <UserContextProvider>
        <SociosRecordsContextProvider>
          <NavBar />
          <AllRoutes />
          <Footer />
          {/* <Toaster /> */}
        </SociosRecordsContextProvider>

      </UserContextProvider>
    </ChakraProvider>
  )
}

export default App