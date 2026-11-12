import React, { useState } from 'react';
import type { Person } from '../types';
import type { Translations } from '../i18n';
import { VersionSwitcher } from './VersionSwitcher';
import { X, MapPin, Mic, BookOpen, ShieldCheck, Lock, Info } from 'lucide-react';

interface PersonCardProps {
  person: Person | null;
  simulationConsent: boolean;
  t: Translations;
  onClose: () => void;
  onEnableSimulation?: () => void;
}

const PersonCardContent: React.FC<{
  person: Person;
  simulationConsent: boolean;
  t: Translations;
  onEnableSimulation?: () => void;
}> = ({ person, simulationConsent, t, onEnableSimulation }) => {
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);

  const isHiddenLiving = person.isLiving && !person.consentToShow && !simulationConsent;
  const isUnknown = person.isUnknown;
  const activeVersion = person.versions[activeVersionIndex] || person.versions[0];

  return (
    <div className="side-panel-body">
      {/* Case 1: Unknown Ancestor */}
      {isUnknown && (
        <div
          style={{
            background: '#F1ECE0',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-secondary)' }}>
            <Info size={18} color="var(--accent-teal)" />
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{t?.unknownCardTitle ?? 'Unknown Ancestor'}</span>
          </div>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--ink-primary)' }}>
            {t?.unknownCardNotice ??
              "This ancestor's name has not been preserved. Gaps are a normal part of a shezhire."}
          </p>
          <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--ink-muted)' }}>
            {t?.unknownCardDesc ??
              'Oral genealogical tradition maintains the continuum of generations even when an individual name has passed beyond living memory. The line continues unbroken through their descendants.'}
          </p>
        </div>
      )}

      {/* Case 2: Hidden Living Relative without consent */}
      {isHiddenLiving && (
        <div
          style={{
            background: '#F4EFE5',
            border: '1.5px dashed #8A806E',
            borderRadius: '8px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-primary)' }}>
            <Lock size={18} color="var(--accent-ochre)" />
            <span style={{ fontWeight: 700, fontSize: '15px' }}>{t?.hiddenLivingTitle ?? 'Living Relative'}</span>
          </div>
          <p style={{ fontSize: '15.5px', lineHeight: '1.55', color: 'var(--ink-primary)', fontWeight: 600 }}>
            {t?.hiddenLivingNotice ??
              'This person is alive. Their data is shown only with their consent.'}
          </p>
          <p style={{ fontSize: '13.5px', lineHeight: '1.5', color: 'var(--ink-secondary)' }}>
            {t?.hiddenLivingDesc ??
              'Modern shezhire respects living family members. Details and stories are concealed until explicit permission is granted.'}
          </p>
          {onEnableSimulation && (
            <button
              className="btn btn-secondary"
              onClick={onEnableSimulation}
              style={{ alignSelf: 'flex-start', marginTop: '4px' }}
            >
              <ShieldCheck size={16} color="var(--accent-teal)" />
              <span>{t?.simulateConsentBtn ?? 'Simulate granting consent'}</span>
            </button>
          )}
        </div>
      )}

      {/* Case 3: Known Person with Stories */}
      {!isUnknown && !isHiddenLiving && (
        <>
          {/* Version Switcher if > 1 version */}
          <VersionSwitcher
            versions={person.versions}
            activeVersionIndex={activeVersionIndex}
            t={t}
            onSelectVersion={setActiveVersionIndex}
          />

          {/* Joined Story and Told By block */}
          {activeVersion ? (
            <div className="story-block">
              <div className="story-content">
                {activeVersion.place && (
                  <div className="story-place">
                    <MapPin size={13} color="var(--accent-ochre)" />
                    <span>{activeVersion.place}</span>
                  </div>
                )}
                <blockquote className="story-text">
                  «{activeVersion.text}»
                </blockquote>
              </div>

              {/* Prominent Told By Section - never separated from the story */}
              <div className="story-teller-block">
                <div className="teller-row">
                  <div className="teller-label-group">
                    <span className="teller-tag">{t?.toldBy ?? 'Told by'}</span>
                    <span className="teller-name">{activeVersion.teller}</span>
                  </div>
                  <div className="teller-meta">
                    <span className={`badge-kind ${activeVersion.kind}`}>
                      {activeVersion.kind === 'oral' ? (
                        <Mic size={11} style={{ marginRight: 3 }} />
                      ) : (
                        <BookOpen size={11} style={{ marginRight: 3 }} />
                      )}
                      <span>
                        {activeVersion.kind === 'oral'
                          ? (t?.oralBadge ?? 'Oral')
                          : (t?.writtenBadge ?? 'Written')}
                      </span>
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-secondary)', fontWeight: 700 }}>
                      {activeVersion.year}
                    </span>
                  </div>
                </div>

                {activeVersion.recordedBy && (
                  <div className="recorder-info">
                    {t?.recordedBy ?? 'Recorded by'}: <strong>{activeVersion.recordedBy}</strong>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: '16px',
                background: '#F5EFE4',
                borderRadius: '6px',
                fontStyle: 'italic',
                color: 'var(--ink-muted)',
                fontSize: '14px',
              }}
            >
              {t?.noStories ?? 'No stories currently recorded for this ancestor.'}
            </div>
          )}

          {/* Cultural memory note */}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', lineHeight: '1.45' }}>
              {t?.culturalNote ??
                'Every oral account belongs to its storyteller. In Shezhire, stories are kept alive by acknowledging who spoke them.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  simulationConsent,
  t,
  onClose,
  onEnableSimulation,
}) => {
  if (!person) {
    return null;
  }

  const isHiddenLiving = person.isLiving && !person.consentToShow && !simulationConsent;
  const isUnknown = person.isUnknown;

  return (
    <aside className="side-panel" aria-label="Person memory card">
      {/* Panel Header */}
      <div className="side-panel-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="node-gen-badge">
              {t?.genOfTotal?.(person.generation) ?? `Generation ${person.generation} of 7`}
            </span>
            {person.isLiving && (person.consentToShow || simulationConsent) && (
              <span className="badge-living">
                <ShieldCheck size={12} /> {t?.livingConsentGiven ?? 'Living · consent given'}
              </span>
            )}
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'var(--ink-primary)',
              lineHeight: 1.2,
            }}
          >
            {isUnknown
              ? (t?.unknownName ?? 'Unknown')
              : isHiddenLiving
              ? (t?.hiddenLivingTitle ?? 'Living Relative')
              : `${person.name}${person.era ? ` (${person.era})` : ''}`}
          </h2>
        </div>
        <button
          className="side-panel-close"
          onClick={onClose}
          aria-label="Close panel"
          title="Close panel"
        >
          <X size={20} />
        </button>
      </div>

      {/* Panel Body Keyed by Person ID */}
      <PersonCardContent
        key={person.id}
        person={person}
        simulationConsent={simulationConsent}
        t={t}
        onEnableSimulation={onEnableSimulation}
      />
    </aside>
  );
};
