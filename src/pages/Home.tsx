import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Wrench, Shield, Clock, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import industrialHero from "@/assets/industrial-hero.jpg";

const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-industrial-blue" />,
      title: t("home.features.reliability.title"),
      description: t("home.features.reliability.description")
    },
    {
      icon: <Wrench className="w-8 h-8 text-industrial-blue" />,
      title: t("home.features.installation.title"),
      description: t("home.features.installation.description")
    },
    {
      icon: <Clock className="w-8 h-8 text-industrial-blue" />,
      title: t("home.features.support.title"),
      description: t("home.features.support.description")
    },
    {
      icon: <Award className="w-8 h-8 text-industrial-blue" />,
      title: t("home.features.certified.title"),
      description: t("home.features.certified.description")
    }
  ];

  const productCategories = [
    {
      title: t("home.products.centrifugal.title"),
      description: t("home.products.centrifugal.description"),
      features: t("home.products.centrifugal.features", { returnObjects: true }) as string[]
    },
    {
      title: t("home.products.submersible.title"),
      description: t("home.products.submersible.description"),
      features: t("home.products.submersible.features", { returnObjects: true }) as string[]
    },
    {
      title: t("home.products.custom.title"),
      description: t("home.products.custom.description"),
      features: t("home.products.custom.features", { returnObjects: true }) as string[]
    }
  ];

  const industries = t("home.industries.list", { returnObjects: true }) as string[];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${industrialHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue/90 to-industrial-blue-dark/90"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t("home.hero.subtitle")}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
            {t("home.hero.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">
                {t("home.hero.requestQuote")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="quote" size="lg" asChild>
              <Link to="/products">{t("home.hero.viewProducts")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-lg text-industrial-grey max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-card hover:shadow-industrial transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-industrial-dark mb-3">{feature.title}</h3>
                  <p className="text-industrial-grey">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-industrial-blue-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
              {t("home.products.title")}
            </h2>
            <p className="text-lg text-industrial-grey max-w-2xl mx-auto">
              {t("home.products.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <Card key={index} className="h-full border-0 shadow-card hover:shadow-industrial transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-industrial-dark mb-3">{category.title}</h3>
                  <p className="text-industrial-grey mb-4">{category.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-industrial-grey">
                        <CheckCircle className="w-4 h-4 text-industrial-blue mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="industrial" className="w-full" asChild>
                    <Link to="/products">{t("home.products.learnMore")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-4">
            {t("home.industries.title")}
          </h2>
          <p className="text-lg text-industrial-grey mb-12 max-w-2xl mx-auto">
            {t("home.industries.subtitle")}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="bg-industrial-blue-light text-industrial-dark px-4 py-3 rounded-lg font-medium hover:bg-industrial-blue hover:text-white transition-colors duration-300"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-industrial text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t("home.cta.subtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="quote" size="lg" asChild>
              <Link to="/contact">
                {t("home.cta.getFreeQuote")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-industrial-blue" asChild>
              <Link to="/services">{t("home.cta.viewServices")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;