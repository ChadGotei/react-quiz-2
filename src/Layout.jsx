import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <NavBar />

      <main className="flex-grow p-6">
        <Outlet />
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Layout;

