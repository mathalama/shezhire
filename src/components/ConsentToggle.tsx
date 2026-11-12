import React from 'react';
import type { Translations } from '../i18n';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface ConsentToggleProps {
  consentSimulation: boolean;
  t: Translations;
  onToggle: () => void;
}

export const ConsentToggle: React.FC<ConsentToggleProps> = ({
  consentSimulation,
  t,
  onToggle,
}) => {
  return (
    <div
      className="switch-container"
      onClick={onToggle}
      role="switch"
      aria-checked={consentSimulation}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onToggle();
        }
      }}
      title="Toggle simulation mode to reveal or hide living relatives who have not yet granted consent"
    >
      <div className={`switch-track ${consentSimulation ? 'active' : ''}`}>
        <div className="switch-thumb" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {consentSimulation ? (
          <ShieldCheck size={16} color="var(--accent-teal)" />
        ) : (
          <ShieldAlert size={16} color="var(--ink-secondary)" />
        )}
        <span className="switch-label">{t?.consentToggle ?? 'Consent given (simulation)'}</span>
      </div>
    </div>
  );
};
