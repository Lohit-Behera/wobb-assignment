import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./components/layout/navbar";
import { Footer } from "./components/layout/footer";

function Layout() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      <Navbar />
      <main className="w-full flex-1 flex justify-center items-center">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
