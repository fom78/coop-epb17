import Socio from "components/Socio";
import { Route, Routes } from "react-router-dom";
import { Faq, Home, ListSocios, NotFound } from 'pages';
import { ProtectedRoute } from "components/ProtectedRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/list" element={<ProtectedRoute rolConAcceso="user"><ListSocios /> </ProtectedRoute>} />
      <Route path="/socio/:id" element={<Socio />} />
      <Route path="/admin" element={<ProtectedRoute rolConAcceso="admin"><ListSocios /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default AllRoutes;
