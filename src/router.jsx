import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Enquiry from "./pages/Enquiry";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enquiry" element={<Enquiry />} />
    </Routes>
  );
}
