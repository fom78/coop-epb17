// import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import { UserContextProvider } from 'context/UserContext'
import Footer from '../layout/footer/Footer'
import AppBar from '../layout/navbar/AppBar'
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
        <AppBar />
        <AllRoutes />
        <Footer />
        {/* <Toaster /> */}

      </UserContextProvider>
    </ChakraProvider>
  )
}

export default App