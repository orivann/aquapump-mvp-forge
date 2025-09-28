import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Footer from './Footer';

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <LanguageProvider>
          <Footer />
        </LanguageProvider>
      </BrowserRouter>
    );
  };

  it('renders the main sections', () => {
    renderFooter();

    // Using the English translations as the default
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
  });

  it('renders the copyright notice', () => {
    renderFooter();

    const copyrightText = `© ${new Date().getFullYear()} AquaPump. All rights reserved.`;
    expect(screen.getByText(copyrightText)).toBeInTheDocument();
  });
});