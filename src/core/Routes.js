import Socio from "components/Socio";
import { Route, Routes } from "react-router-dom";
import { Faq, Home, ListSocios, NotFound } from 'pages';
import { ProtectedRoute } from "components/ProtectedRoute";
import { Admin } from "pages/Admin";
import { Container } from "@chakra-ui/react";

function AllRoutes() {
  return (
    <Container 
      maxW={[
        '100%', // 0-30em
        '75%', // 30em-48em
        '75%', // 48em-62em
        '75%', // 62em+
      ]} 
      // maxW='4xl' 
      bg='white.600' 
      centerContent
    >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/list" element={<ProtectedRoute rolConAcceso="user"><ListSocios /> </ProtectedRoute>} />
      <Route path="/socio/:id" element={<Socio />} />
      <Route path="/admin" element={<ProtectedRoute rolConAcceso="admin"><Admin /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Container>
  )
}
export default AllRoutes;
