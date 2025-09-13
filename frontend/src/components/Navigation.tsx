import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "../contexts/LanguageContext";

const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/products", label: t('nav.products') },
    { href: "/services", label: t('nav.services') },
    { href: "/about", label: t('nav.about') },
    { href: "/contact", label: t('nav.contact') },
  ];

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-industrial rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-industrial-dark">AquaPump</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors hover:text-industrial-blue ${
                  isActive(link.href) ? "text-industrial-blue" : "text-industrial-grey"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Language & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>
              <ReactCountryFlag countryCode="US" svg />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleLanguageChange('he')} disabled={language === 'he'}>
              <ReactCountryFlag countryCode="IL" svg />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-industrial-blue ${
                    isActive(link.href) ? "text-industrial-blue bg-industrial-blue-light" : "text-industrial-grey"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleLanguageChange('en')} disabled={language === 'en'}>
                    <ReactCountryFlag countryCode="US" svg />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleLanguageChange('he')} disabled={language === 'he'}>
                    <ReactCountryFlag countryCode="IL" svg />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;