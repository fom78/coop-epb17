import Socio from "components/Socio";
import { Faq } from "pages/Faq";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound } from "../pages";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/socio/:id" element={<Socio />} />
      {/* <Route path="/new" element={<PostForm />} />
        <Route path="/:id" element={<PostForm />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default AllRoutes;
