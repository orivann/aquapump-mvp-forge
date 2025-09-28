import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // If no consent is stored, show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Store consent and hide the banner
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
    // Here you would typically initialize analytics scripts (e.g., Google Analytics)
  };

  const handleDecline = () => {
    // Store non-consent and hide the banner
    localStorage.setItem("cookie_consent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <div className="container-fluid mx-auto">
            <div className="bg-card/80 backdrop-blur-lg p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border">
              <div className="flex items-center">
                <Cookie className="h-10 w-10 text-primary mr-4 flex-shrink-0" />
                <p className="text-foreground text-sm md:text-base">
                  We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                  <Link to="/privacy-policy" className="underline hover:text-primary ml-2">
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-4">
                <Button variant="outline" onClick={handleDecline}>
                  Decline
                </Button>
                <Button className="btn-primary" onClick={handleAccept}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;