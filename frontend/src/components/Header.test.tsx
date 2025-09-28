import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from './Header';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
      </BrowserRouter>
    );
  };

  it('renders the brand name "AquaPump"', () => {
    renderHeader();
    const brandElement = screen.getByText(/AquaPump/i);
    expect(brandElement).toBeInTheDocument();
  });

  it('renders all main navigation links in English by default', () => {
    renderHeader();

    // These keys correspond to the keys in translations.json
    const navLinks = ["Products", "Solutions", "About", "Blog", "Support", "Contact"];

    navLinks.forEach(linkText => {
        const linkElement = screen.getByText(linkText);
        expect(linkElement).toBeInTheDocument();
    });
  });
});