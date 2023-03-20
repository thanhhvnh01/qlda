import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TawkTo from "tawkto-react";
import Footer from "./footer/Footer";
import Navbar from "./header/Navbar";
// icon

const MainLayout = () => {
  useEffect(() => {
    const tawk = new TawkTo("636391ebdaff0e1306d57b77", "1gguf405l");
    tawk.showWidget();
  });
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
