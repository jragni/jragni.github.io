/**
 * Navigation Bar Component
 * Top navigation for section jumping with cyberpunk styling
 */

import { useState } from 'react';
import { Home, User, Code, Briefcase, FolderOpen, Mail, Menu, X } from 'lucide-react';

interface NavigationBarProps {
  currentSection: string;
  onSectionClick: (section: string) => void;
}

const NavigationBar = ({ currentSection, onSectionClick }: NavigationBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hub', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: 'rgba(10, 25, 47, 0.95)',
          borderBottom: '2px solid var(--neon-teal)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
        }}
      >
        {/* Logo/Brand */}
        <div
          className="cyber-text"
          style={{
            fontSize: '1.5rem',
            color: 'var(--neon-teal)',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.1em',
          }}
        >
          PORTFOLIO.3D
        </div>

        {/* Desktop Menu */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
          className="desktop-menu"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                backgroundColor:
                  currentSection === item.id
                    ? 'rgba(100, 255, 218, 0.2)'
                    : 'transparent',
                border: `1px solid ${
                  currentSection === item.id ? 'var(--neon-teal)' : 'var(--grid-lines)'
                }`,
                borderRadius: '4px',
                color: currentSection === item.id ? 'var(--neon-teal)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={(e) => {
                if (currentSection !== item.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
                  e.currentTarget.style.borderColor = 'var(--neon-teal)';
                  e.currentTarget.style.color = 'var(--neon-teal)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSection !== item.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--grid-lines)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            padding: '0.5rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--neon-teal)',
            borderRadius: '4px',
            color: 'var(--neon-teal)',
            cursor: 'pointer',
          }}
          className="mobile-menu-button"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(10, 25, 47, 0.98)',
            borderBottom: '2px solid var(--neon-teal)',
            backdropFilter: 'blur(10px)',
            zIndex: 999,
            padding: '1rem',
            display: 'none',
          }}
          className="mobile-menu"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '1rem',
                marginBottom: '0.5rem',
                backgroundColor:
                  currentSection === item.id
                    ? 'rgba(100, 255, 218, 0.2)'
                    : 'transparent',
                border: `1px solid ${
                  currentSection === item.id ? 'var(--neon-teal)' : 'var(--grid-lines)'
                }`,
                borderRadius: '4px',
                color: currentSection === item.id ? 'var(--neon-teal)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'Space Mono, monospace',
                fontSize: '1rem',
                textAlign: 'left',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default NavigationBar;