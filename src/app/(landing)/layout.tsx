import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col px-16">
      <Navbar />
      <div className="flex-1 p-6 bg-gray-100 mt-24">
        {children}
      </div>
      <Footer />
    </div>
  );
}