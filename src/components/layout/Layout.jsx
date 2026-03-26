import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const Layout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/30">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden relative">
                {/* Background decorative blob */}
                <div className="absolute top-0 right-0 -z-10 bg-orange-100/50 w-full h-96 
          rounded-bl-[100px] blur-3xl mix-blend-multiply opacity-60 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"
                />

                <Outlet />
            </main>
            <MobileNav />
        </div>
    );
};

export default Layout;
