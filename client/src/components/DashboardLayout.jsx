import Footer from "./Footer";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => (
  <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
    <Sidebar />
    <div className="min-w-0 flex-1">
      <MobileNav />
      <main className="min-w-0">{children}</main>
      <Footer />
    </div>
  </div>
);

export default DashboardLayout;
