// import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import Footer from '../layout/footer/Footer'
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
      <div>
        <AllRoutes />
        <Footer />
        {/* <Toaster /> */}

      </div>
    </ChakraProvider>
  )
}

export default App