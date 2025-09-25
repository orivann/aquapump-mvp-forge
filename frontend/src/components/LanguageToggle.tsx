import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 transition-all duration-300 hover:bg-accent hover:text-accent-foreground ${
        isRTL ? 'flex-row-reverse' : ''
      }`}
      aria-label={`Switch to ${language === 'en' ? 'Hebrew' : 'English'}`}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'עברית' : 'English'}
      </span>
    </Button>
  );
};

export default LanguageToggle;