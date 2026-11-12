import { useState } from 'react';
import type { Person, SourceKind } from '../types';
import type { Translations } from '../i18n';
import { X, Feather, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RecordStoryModalProps {
  isOpen: boolean;
  t: Translations;
  people: Person[];
  simulationConsent: boolean;
  selectedPersonId?: string;
  onClose: () => void;
}

export const RecordStoryModal: React.FC<RecordStoryModalProps> = ({
  isOpen,
  t,
  people,
  simulationConsent,
  selectedPersonId,
  onClose,
}) => {
  // Filter out unknown ancestors and hidden living relatives without consent
  const eligiblePeople = people.filter((p) => {
    if (p.isUnknown) return false;
    if (p.isLiving && !p.consentToShow && !simulationConsent) return false;
    return true;
  });

  const [personId, setPersonId] = useState<string>(
    selectedPersonId && eligiblePeople.some((p) => p.id === selectedPersonId)
      ? selectedPersonId
      : eligiblePeople[0]?.id ?? ''
  );
  const [storyText, setStoryText] = useState('');
  const [place, setPlace] = useState('');
  const [teller, setTeller] = useState('');
  const [kind, setKind] = useState<SourceKind>('oral');
  const [recordedBy, setRecordedBy] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isTellerEmpty = teller.trim() === '';
  const isSubmitDisabled = isTellerEmpty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setSubmittedMessage(t?.recordMockNotice ?? 'This is a mockup. Nothing is saved.');
    setTimeout(() => {
      setSubmittedMessage(null);
      setStoryText('');
      setPlace('');
      setTeller('');
      setRecordedBy('');
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Feather size={20} color="var(--accent-teal)" />
            <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: 600 }}>
              {t?.recordModalTitle ?? "Record an Elder's Story"}
            </h3>
          </div>
          <button className="side-panel-close" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {submittedMessage ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <CheckCircle2 size={42} color="var(--accent-teal)" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--ink-primary)', marginBottom: '8px' }}>
              {t?.recordSuccessTitle ?? 'Story Recorded'}
            </h4>
            <p style={{ fontSize: '15px', color: 'var(--ink-secondary)', fontWeight: 500 }}>
              {submittedMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">
                  {t?.selectPerson ?? 'Ancestor / Relative'} <span className="form-label-required">*</span>
                </label>
                <select
                  className="form-select"
                  value={personId}
                  onChange={(e) => setPersonId(e.target.value)}
                >
                  {eligiblePeople.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({t?.generations[p.generation]?.name ?? `Gen ${p.generation}`}) {p.era ? `· ${p.era}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t?.storyTextLabel ?? 'Story text'}</label>
                <textarea
                  className="form-textarea font-serif"
                  rows={4}
                  placeholder={t?.storyPlaceholder ?? 'Record what was remembered...'}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t?.placeLabel ?? 'Place / Region'}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={t?.placePlaceholder ?? 'e.g. Karaganda region (Karkaraly)'}
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t?.yearLabel ?? 'Year of Telling'}</label>
                  <input
                    type="number"
                    className="form-input"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t?.tellerLabel ?? 'Told by'} <span className="form-label-required">{t?.tellerRequired ?? '*'}</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={t?.tellerPlaceholder ?? 'e.g. Aksakal Bauyrzhan, Aunt Zhanar'}
                  value={teller}
                  onChange={(e) => setTeller(e.target.value)}
                  required
                />
                {isTellerEmpty ? (
                  <div className="form-hint warning" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <AlertCircle size={13} />
                    <span>{t?.tellerHintEmpty ?? 'A story without a teller is not saved.'}</span>
                  </div>
                ) : (
                  <div className="form-hint">{t?.tellerHintFilled ?? 'Every story in shezhire must have an attributed voice.'}</div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t?.sourceTypeLabel ?? 'Source Type'}</label>
                  <select
                    className="form-select"
                    value={kind}
                    onChange={(e) => setKind(e.target.value as SourceKind)}
                  >
                    <option value="oral">{t?.oralOption ?? 'Oral'}</option>
                    <option value="written">{t?.writtenOption ?? 'Written'}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t?.recordedByLabel ?? 'Recorded by (optional)'}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={t?.recordedByPlaceholder ?? 'e.g. his descendant Daniyar'}
                    value={recordedBy}
                    onChange={(e) => setRecordedBy(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                {t?.cancelBtn ?? 'Cancel'}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitDisabled}
                title={isSubmitDisabled ? t?.tellerHintEmpty : t?.saveBtn}
              >
                <Feather size={14} />
                <span>{t?.saveBtn ?? 'Save Story Record'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
