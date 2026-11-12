import React from 'react';
import type { Version } from '../types';
import type { Translations } from '../i18n';

interface VersionSwitcherProps {
  versions: Version[];
  activeVersionIndex: number;
  t: Translations;
  onSelectVersion: (index: number) => void;
}

export const VersionSwitcher: React.FC<VersionSwitcherProps> = ({
  versions,
  activeVersionIndex,
  t,
  onSelectVersion,
}) => {
  if (versions.length <= 1) {
    return null;
  }

  return (
    <div className="version-switcher">
      <div className="version-tabs" role="tablist" aria-label="Lineage memory versions">
        {versions.map((version, index) => {
          const isActive = index === activeVersionIndex;
          return (
            <button
              key={version.id}
              role="tab"
              aria-selected={isActive}
              className={`version-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectVersion(index)}
            >
              <span>{t.versionTab(index + 1, version.teller)}</span>
            </button>
          );
        })}
      </div>
      <div className="version-dispute-note">
        {t?.disputeNote ??
          'Relatives remember this differently. Both versions are kept; none is marked as correct.'}
      </div>
    </div>
  );
};
