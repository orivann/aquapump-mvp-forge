import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import Chatbot from "./Chatbot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <a
        href="#main-content"
        className="absolute z-[9999] left-4 top-4 -translate-y-12 focus:translate-y-0 p-3 bg-primary text-primary-foreground font-semibold rounded-lg transition-transform duration-300"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <Chatbot />
    </div>
  );
};

export default Layout;