import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { Person } from '../types';
import type { Translations } from '../i18n';
import { Lock, Layers, BookOpen, Mic, ShieldCheck } from 'lucide-react';

export interface PersonNodeData {
  person: Person;
  isSelected: boolean;
  simulationConsent: boolean;
  t: Translations;
  onSelect: (person: Person) => void;
  [key: string]: unknown;
}

export const PersonNode = memo(({ data }: NodeProps) => {
  const nodeData = data as unknown as PersonNodeData;
  const { person, isSelected, simulationConsent, t, onSelect } = nodeData;

  const isHiddenLiving = person.isLiving && !person.consentToShow && !simulationConsent;
  const isUnknown = person.isUnknown;

  const handleClick = () => {
    onSelect(person);
  };

  const getClassName = () => {
    const classes = ['shezhire-node'];
    if (isSelected) classes.push('selected');
    if (isUnknown) classes.push('is-unknown');
    else if (isHiddenLiving) classes.push('is-hidden-living');
    return classes.join(' ');
  };

  return (
    <div className={getClassName()} onClick={handleClick} tabIndex={0} role="button">
      {/* Top Handle for parent link */}
      {person.generation > 1 && (
        <Handle
          type="target"
          position={Position.Top}
          style={{
            background: isSelected ? 'var(--accent-teal)' : '#5A5243',
            width: 9,
            height: 9,
            borderRadius: 5,
            border: '2px solid #FAF7F2',
          }}
        />
      )}

      {/* Main Node Content */}
      {isUnknown ? (
        <div className="node-content-unknown">
          <div className="node-name-unknown">{t?.unknownName ?? 'Unknown'}</div>
          <div className="node-sub-unknown">{t?.preservedGap ?? 'Preserved gap'}</div>
        </div>
      ) : isHiddenLiving ? (
        <div className="node-content-hidden">
          <div className="node-hidden-row">
            <Lock size={15} className="lock-icon" />
            <span className="node-hidden-title">{t?.livingHidden ?? 'Living relative · hidden'}</span>
          </div>
          <div className="node-hidden-hint">{t?.consentRequired ?? 'Consent needed'}</div>
        </div>
      ) : (
        <div className="node-content-known">
          <div className="node-title-row">
            <span className="node-name">{person.name}</span>
            {person.era && <span className="node-era">{person.era}</span>}
          </div>

          <div className="node-badges-row">
            {person.isLiving && (person.consentToShow || simulationConsent) && (
              <span className="badge-living" title="Living relative with granted consent">
                <ShieldCheck size={11} />
                <span>{t?.livingConsentGiven ?? 'Living'}</span>
              </span>
            )}

            {person.versions.length > 1 && (
              <span className="badge-versions" title={`${person.versions.length} versions`}>
                <Layers size={11} />
                <span>{t?.versionsCount(person.versions.length) ?? `${person.versions.length} versions`}</span>
              </span>
            )}

            {person.versions.length === 1 && (
              <span className={`badge-kind ${person.versions[0].kind}`}>
                {person.versions[0].kind === 'oral' ? (
                  <Mic size={10} style={{ marginRight: 3 }} />
                ) : (
                  <BookOpen size={10} style={{ marginRight: 3 }} />
                )}
                <span>
                  {person.versions[0].kind === 'oral'
                    ? (t?.oralBadge ?? 'Oral')
                    : (t?.writtenBadge ?? 'Written')}
                </span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bottom Handle for children links */}
      {person.generation < 7 && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            background: isSelected ? 'var(--accent-teal)' : '#5A5243',
            width: 9,
            height: 9,
            borderRadius: 5,
            border: '2px solid #FAF7F2',
          }}
        />
      )}
    </div>
  );
});

PersonNode.displayName = 'PersonNode';
