import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/products", label: t('nav.products') },
    { href: "/services", label: t('nav.services') },
    { href: "/about", label: t('nav.about') },
    { href: "/contact", label: t('nav.contact') },
  ];

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

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => i18n.changeLanguage('en')}>
              <ReactCountryFlag countryCode="US" svg />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => i18n.changeLanguage('he')}>
              <ReactCountryFlag countryCode="IL" svg />
            </Button>
            <div className="flex items-center text-sm text-industrial-grey">
              <Phone className="w-4 h-4 mr-1" />
              <span>+1 (555) 123-4567</span>
            </div>
            <Button variant="industrial" size="sm" asChild>
              <Link to="/contact">{t('nav.get_quote')}</Link>
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
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => {i18n.changeLanguage('en'); setIsOpen(false);}}>
                    <ReactCountryFlag countryCode="US" svg />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => {i18n.changeLanguage('he'); setIsOpen(false);}}>
                    <ReactCountryFlag countryCode="IL" svg />
                  </Button>
                </div>
                <div className="flex items-center text-sm text-industrial-grey pt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <Button variant="industrial" size="sm" className="w-full" asChild>
                  <Link to="/contact">{t('nav.get_quote')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;