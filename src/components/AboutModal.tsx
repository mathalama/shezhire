import React from 'react';
import type { Translations } from '../i18n';
import { X, BookHeart, ShieldAlert, Sparkles, Server } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  t: Translations;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, t, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookHeart size={20} color="var(--accent-teal)" />
            <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: 600 }}>
              {t?.aboutTitle ?? 'About Shezhire'}
            </h3>
          </div>
          <button className="side-panel-close" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <section>
            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              {t?.philosophyTitle ?? 'The Philosophy of Living Memory'}
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink-secondary)' }}>
              {t?.philosophyText}
            </p>
          </section>

          <section>
            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              {t?.attributionTitle ?? 'Why Stories Are Never Anonymous'}
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink-secondary)' }}>
              {t?.attributionText}
            </p>
          </section>

          <section>
            <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>
              {t?.gapsTitle ?? 'Gaps and Privacy'}
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink-secondary)' }}>
              {t?.gapsText}
            </p>
          </section>

          {/* Ethical Design Stance */}
          <div
            style={{
              background: '#F1ECE0',
              border: '1px solid var(--border-strong)',
              borderRadius: '8px',
              padding: '14px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <ShieldAlert size={20} color="var(--accent-teal)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ink-primary)', marginBottom: '4px' }}>
                {t?.ethicalTitle ?? 'Ethical Design Stance'}
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-primary)', fontWeight: 600, lineHeight: '1.5' }}>
                {t?.ethicalText}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                {t?.ethicalSubtext}
              </p>
            </div>
          </div>

          {/* Target Architecture Specification */}
          <div
            style={{
              background: '#FAF7F2',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Server size={16} color="var(--ink-muted)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>
              Target architecture: React → Go API → PostgreSQL. In the demo, data is loaded from a JSON file.
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            <Sparkles size={14} />
            <span>{t?.closeBtn ?? 'Understood'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
