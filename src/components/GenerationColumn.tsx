import React from 'react';
import type { Translations } from '../i18n';
import { Layers } from 'lucide-react';

interface GenerationColumnProps {
  activeGeneration?: number;
  t: Translations;
  onSelectGeneration?: (generation: number) => void;
}

export const GenerationColumn: React.FC<GenerationColumnProps> = ({
  activeGeneration,
  t,
  onSelectGeneration,
}) => {
  const genNumbers = [1, 2, 3, 4, 5, 6, 7];

  return (
    <aside className="generation-column" aria-label="Generation navigation rail">
      <div className="gen-column-header">
        <Layers size={14} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
        <span className="gen-header-title">{t.navHeader}</span>
      </div>
      <div className="gen-column-list">
        {genNumbers.map((g) => {
          const isActive = activeGeneration === g;
          const info = t.generations[g];
          return (
            <button
              key={g}
              className={`gen-column-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectGeneration?.(g)}
              title={`${info?.name}: ${info?.role} (${info?.era})`}
            >
              <div className="gen-item-top">
                <span className="gen-item-title">{info?.name ?? `Gen ${g}`}</span>
                <span className="gen-item-era-badge">{info?.era?.split(' ')[0] ?? ''}</span>
              </div>
              <span className="gen-item-sub">{info?.role}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
