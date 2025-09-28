import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { to: "/about", key: "about" },
    { to: "/products", key: "products" },
    { to: "/services", key: "services" },
    { to: "/blog", key: "blog" },
    { to: "/contact", key: "contact" },
  ];

  return (
    <footer className="bg-card text-card-foreground py-16">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">AquaPump</h3>
            <p className="text-muted-foreground mb-4">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.key}>
                  <NavLink to={link.to} className="text-muted-foreground hover:text-primary transition-colors">
                    {t(`header.${link.key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-4">{t('footer.newsletter')}</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest news and offers.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your Email" className="bg-background" />
              <Button type="submit" className="btn-primary">{t('footer.subscribe')}</Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;