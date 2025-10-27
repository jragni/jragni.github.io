/**
 * Contact Section Content
 */

import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const ContactSection = () => {
  const contactLinks = [
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      href: 'https://github.com/jragni',
      username: '@jragni',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jragni',
      username: 'in/jragni',
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      href: 'mailto:contact@jragni.com',
      username: 'contact@jragni.com',
    },
  ];

  return (
    <div>
      <p
        style={{
          marginBottom: '2.5rem',
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
        }}
      >
        Interested in collaborating or have a project in mind? Let's connect and build something
        amazing together.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        {contactLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem',
              marginBottom: '1rem',
              backgroundColor: 'rgba(100, 255, 218, 0.05)',
              border: '1px solid var(--neon-teal)',
              borderRadius: '4px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(100, 255, 218, 0.15)';
              e.currentTarget.style.borderColor = 'var(--neon-cyan)';
              e.currentTarget.style.transform = 'translateX(10px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(100, 255, 218, 0.05)';
              e.currentTarget.style.borderColor = 'var(--neon-teal)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ color: 'var(--neon-teal)' }}>{link.icon}</div>
            <div style={{ flex: 1 }}>
              <div
                className="cyber-text"
                style={{
                  fontSize: '1rem',
                  marginBottom: '0.25rem',
                  color: 'var(--neon-teal)',
                }}
              >
                {link.label}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {link.username}
              </div>
            </div>
            <ExternalLink size={18} style={{ color: 'var(--neon-purple)', opacity: 0.6 }} />
          </a>
        ))}
      </div>

      <div
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(100, 255, 218, 0.05)',
          border: '1px solid var(--neon-teal)',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <p
          className="cyber-text"
          style={{
            fontSize: '1.1rem',
            color: 'var(--neon-teal)',
            marginBottom: '0.5rem',
          }}
        >
          Open to Opportunities
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Currently available for freelance projects and full-time positions.
        </p>
      </div>
    </div>
  );
};

export default ContactSection;