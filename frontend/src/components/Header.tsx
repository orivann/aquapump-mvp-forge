import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinkKeys = [
  { key: "products", to: "/products" },
  { key: "solutions", to: "/solutions" },
  { key: "about", to: "/about" },
  { key: "blog", to: "/blog" },
  { key: "support", to: "/support" },
  { key: "contact", to: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = navLinkKeys.map(item => ({
      ...item,
      name: t(`header.${item.key}`)
  }))

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "hsla(var(--card) / 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-bold text-primary">
              AquaPump
            </NavLink>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                to={link.to}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" onClick={toggleLanguage} className="font-semibold">
              <Globe className="h-5 w-5 mr-2" />
              {language.toUpperCase()}
            </Button>
            <Button>{t('header.requestQuote')}</Button>
          </div>
          <div className="md:hidden flex items-center">
             <Button variant="ghost" onClick={toggleLanguage} size="icon" className="font-semibold mr-2">
                <Globe className="h-6 w-6" />
             </Button>
            <button onClick={toggleMenu} className="text-foreground">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/90 backdrop-blur-lg"
          >
            <nav className="flex flex-col items-center space-y-4 py-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.key}
                  to={link.to}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `text-xl font-medium transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-7 w-7" />
                </Button>
              </div>
              <Button className="mt-4">{t('header.requestQuote')}</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;