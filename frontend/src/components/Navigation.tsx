import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: t('nav.home') },
    {
      label: t('nav.solutions'),
      subLinks: [
        { href: "/products", label: t('nav.products') },
        { href: "/services", label: t('nav.services') },
      ],
    },
    { href: "/about", label: t('nav.about') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-elegant border-b border-border sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto responsive-padding">
        <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-3 group transition-all duration-300 hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">AquaPump</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            {navLinks.map((link) =>
              link.subLinks ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className={`flex items-center font-medium transition-all duration-200 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md px-2 py-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRTL ? 'mr-1' : 'ml-1'}`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white/95 backdrop-blur-md border border-border/50 shadow-elegant">
                    {link.subLinks.map((subLink) => (
                      <DropdownMenuItem key={subLink.href} asChild>
                        <Link 
                          to={subLink.href}
                          className="transition-colors duration-200 hover:bg-accent/50 focus:bg-accent/50 rounded-md"
                        >
                          {subLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-all duration-200 hover:text-primary px-3 py-2 rounded-md hover:bg-accent/30 ${
                    isActive(link.href)
                      ? "text-primary bg-accent/50"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            <LanguageToggle />
            <div className={`flex items-center text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Phone className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span dir="ltr">{t('nav.phone')}</span>
            </div>
            <Button variant="default" size="sm" className="btn-primary shadow-lg" asChild>
              <Link to="/contact">{t('nav.getQuote')}</Link>
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
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-border/50">
              {navLinks.flatMap((link) =>
                link.subLinks
                  ? link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        to={subLink.href}
                        className={`block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg hover:text-primary hover:bg-accent/50 ${
                          isActive(subLink.href)
                            ? "text-primary bg-accent"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subLink.label}
                      </Link>
                    ))
                  : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg hover:text-primary hover:bg-accent/50 ${
                        isActive(link.href)
                          ? "text-primary bg-accent"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
              )}
              <div className="px-4 py-3 space-y-3 border-t border-border/30 mt-4 pt-4">
                <LanguageToggle />
                <div className={`flex items-center text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span dir="ltr">{t('nav.phone')}</span>
                </div>
                <Button variant="default" size="sm" className="w-full btn-primary" asChild>
                  <Link to="/contact">{t('nav.getQuote')}</Link>
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