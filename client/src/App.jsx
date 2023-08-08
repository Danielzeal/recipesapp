import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='w-full overflow-hidden min-h-screen flex flex-col'>
      <Header />
      <main className='pt-[100px] mb-6 flex-grow'>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
