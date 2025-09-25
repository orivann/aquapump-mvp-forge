import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Wrench, Shield, Clock, Award } from "lucide-react";
import industrialHero from "@/assets/industrial-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary animate-float" />,
      title: t('features.reliable.title'),
      description: t('features.reliable.desc')
    },
    {
      icon: <Wrench className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '0.5s' }} />,
      title: t('features.expert.title'),
      description: t('features.expert.desc')
    },
    {
      icon: <Clock className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '1s' }} />,
      title: t('features.support.title'),
      description: t('features.support.desc')
    },
    {
      icon: <Award className="w-8 h-8 text-primary animate-float" style={{ animationDelay: '1.5s' }} />,
      title: t('features.certified.title'),
      description: t('features.certified.desc')
    }
  ];

  const productCategories = [
    {
      title: t('products.centrifugal.title'),
      description: t('products.centrifugal.desc'),
      features: [t('products.centrifugal.feature1'), t('products.centrifugal.feature2'), t('products.centrifugal.feature3')]
    },
    {
      title: t('products.submersible.title'),
      description: t('products.submersible.desc'),
      features: [t('products.submersible.feature1'), t('products.submersible.feature2'), t('products.submersible.feature3')]
    },
    {
      title: t('products.custom.title'),
      description: t('products.custom.desc'),
      features: [t('products.custom.feature1'), t('products.custom.feature2'), t('products.custom.feature3')]
    }
  ];

  const industries = [
    t('industries.manufacturing'), 
    t('industries.oilGas'), 
    t('industries.waterTreatment'), 
    t('industries.mining'), 
    t('industries.agriculture'), 
    t('industries.construction')
  ];

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${industrialHero})` }}
        >
          <div className="absolute inset-0 gradient-hero"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto responsive-padding animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-3xl mb-8 text-primary-foreground/90 font-medium">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-primary-foreground/80 leading-relaxed text-pretty">
            {t('hero.description')}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button variant="default" size="lg" className="btn-primary text-lg px-8 py-3 h-auto animate-scale-in" asChild>
              <Link to="/contact">
                {t('hero.requestQuote')}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="btn-secondary text-lg px-8 py-3 h-auto animate-scale-in" style={{ animationDelay: '0.2s' }} asChild>
              <Link to="/products">{t('hero.viewProducts')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-accent/30">
        <div className="max-w-7xl mx-auto responsive-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {t('features.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center border-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto responsive-padding">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {t('products.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {t('products.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <Card 
                key={index} 
                className="h-full border-0 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">
                    {category.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle className={`w-4 h-4 text-primary ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="default" className="w-full btn-primary group-hover:scale-105 transition-transform duration-300" asChild>
                    <Link to="/products">{t('products.learnMore')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gradient-to-br from-white to-accent/20">
        <div className="max-w-7xl mx-auto responsive-padding text-center">
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {t('industries.title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed text-pretty">
              {t('industries.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm text-foreground px-6 py-4 rounded-xl font-medium 
                          hover:bg-primary hover:text-white transform hover:-translate-y-1 hover:scale-105
                          transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer
                          animate-fade-in border border-border/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-sm md:text-base">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto responsive-padding text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              {t('cta.title')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed text-pretty">
              {t('cta.subtitle')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button variant="secondary" size="lg" className="btn-secondary text-lg px-8 py-3 h-auto animate-scale-in shadow-xl" asChild>
                <Link to="/contact">
                  {t('cta.getFreeQuote')}
                  <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-effect text-white hover:bg-white/20 border-white/30 text-lg px-8 py-3 h-auto animate-scale-in" 
                style={{ animationDelay: '0.2s' }}
                asChild
              >
                <Link to="/services">{t('cta.viewServices')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;