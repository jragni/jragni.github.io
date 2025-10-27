/**
 * Side Panel Overlay Component
 * Slides in to display section content when camera approaches
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import '../index.css';

interface SidePanelProps {
  isVisible: boolean;
  section: string;
  children: React.ReactNode;
}

const SidePanel = ({ isVisible, section, children }: SidePanelProps) => {
  const panelVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        mass: 0.8,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 150,
        damping: 25,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="side-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: '450px',
            maxWidth: '90vw',
            backgroundColor: 'rgba(10, 25, 47, 0.98)',
            borderLeft: '2px solid var(--neon-teal)',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Header */}
          <div
            className="cyber-text glow-text"
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              borderBottom: '1px solid var(--neon-teal)',
              paddingBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {section}
          </div>

          {/* Content */}
          <div style={{ color: 'var(--text-secondary)' }}>{children}</div>

          {/* Decorative corner accents */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '30px',
              height: '30px',
              borderTop: '2px solid var(--neon-purple)',
              borderRight: '2px solid var(--neon-purple)',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '30px',
              height: '30px',
              borderBottom: '2px solid var(--neon-purple)',
              borderRight: '2px solid var(--neon-purple)',
              opacity: 0.6,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Skill Tag Component
export const SkillTag = ({ skill }: { skill: string }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '0.3rem 0.8rem',
      margin: '0.25rem',
      backgroundColor: 'rgba(100, 255, 218, 0.1)',
      border: '1px solid var(--neon-teal)',
      borderRadius: '4px',
      fontSize: '0.85rem',
      color: 'var(--neon-teal)',
      fontFamily: 'Space Mono, monospace',
    }}
  >
    {skill}
  </span>
);

// External Link Button
export const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      marginTop: '1rem',
      backgroundColor: 'transparent',
      border: '2px solid var(--neon-cyan)',
      color: 'var(--neon-cyan)',
      textDecoration: 'none',
      fontFamily: 'Orbitron, sans-serif',
      textTransform: 'uppercase',
      fontSize: '0.9rem',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.2)';
      e.currentTarget.style.transform = 'translateX(-5px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.transform = 'translateX(0)';
    }}
  >
    {children}
    <ExternalLink size={16} />
  </a>
);

export default SidePanel;