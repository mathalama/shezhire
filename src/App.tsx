import { useState, useCallback, useMemo } from 'react';
import type { Person } from './types';
import type { Language } from './i18n';
import { translations } from './i18n';
import { getLocalizedPerson } from './utils/localize';
import familyData from './data/family.json';
import { FamilyGraph } from './components/FamilyGraph';
import { PersonCard } from './components/PersonCard';
import { GenerationColumn } from './components/GenerationColumn';
import { ConsentToggle } from './components/ConsentToggle';
import { RecordStoryModal } from './components/RecordStoryModal';
import { AboutModal } from './components/AboutModal';
import { Scroll, Feather, Info, Globe } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>('ru');
  const t = useMemo(() => translations[lang], [lang]);

  // Dynamically localize all family members, their names, places, stories and tellers based on active language
  const people: Person[] = useMemo(() => {
    return (familyData as Person[]).map((p) => getLocalizedPerson(p, lang));
  }, [lang]);

  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [simulationConsent, setSimulationConsent] = useState(false);
  const [targetGeneration, setTargetGeneration] = useState<number | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const selectedPerson = useMemo(() => {
    return people.find((p) => p.id === selectedPersonId) || null;
  }, [people, selectedPersonId]);

  const handleSelectPerson = useCallback((person: Person) => {
    setSelectedPersonId(person.id);
  }, []);

  const handleCloseCard = useCallback(() => {
    setSelectedPersonId(null);
  }, []);

  const handleToggleConsent = useCallback(() => {
    setSimulationConsent((prev) => !prev);
  }, []);

  const handleSelectGeneration = useCallback((gen: number) => {
    setTargetGeneration(gen);
    setTimeout(() => setTargetGeneration(null), 700);
  }, []);

  return (
    <div id="root">
      {/* Top Application Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo-icon">
            <Scroll size={22} />
          </div>
          <div className="brand-titles">
            <div className="brand-title">{t.appTitle}</div>
            <div className="brand-subtitle">{t.appSubtitle}</div>
          </div>
        </div>

        <div className="header-actions">
          {/* Language Switcher */}
          <div className="lang-switcher" role="group" aria-label="Language selection">
            <Globe size={14} color="var(--ink-muted)" style={{ marginLeft: 6 }} />
            <button
              className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
              onClick={() => setLang('ru')}
              title="Русский язык"
            >
              РУС
            </button>
            <button
              className={`lang-btn ${lang === 'kz' ? 'active' : ''}`}
              onClick={() => setLang('kz')}
              title="Қазақ тілі"
            >
              ҚАЗ
            </button>
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              title="English"
            >
              ENG
            </button>
          </div>

          {/* Simulation Toggle for Living Relatives Consent */}
          <ConsentToggle
            consentSimulation={simulationConsent}
            t={t}
            onToggle={handleToggleConsent}
          />

          {/* Record an elder's story action */}
          <button
            className="btn btn-secondary"
            onClick={() => setIsRecordModalOpen(true)}
            title="Записать устное или письменное воспоминание старейшины"
          >
            <Feather size={15} color="var(--accent-teal)" />
            <span>{t.recordStoryBtn}</span>
          </button>

          {/* About Dialog Button */}
          <button
            className="btn btn-outline"
            onClick={() => setIsAboutModalOpen(true)}
            title="О философии и этических принципах Шежіре"
          >
            <Info size={16} />
            <span>{t.aboutBtn}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="app-main">
        {/* Left Column: 7 Generations guide rail (175px, no clipping) */}
        <GenerationColumn
          activeGeneration={selectedPerson?.generation}
          t={t}
          onSelectGeneration={handleSelectGeneration}
        />

        {/* Center: Interactive Ancestor Tree Graph */}
        <FamilyGraph
          people={people}
          selectedPersonId={selectedPersonId}
          simulationConsent={simulationConsent}
          t={t}
          onSelectPerson={handleSelectPerson}
          targetGeneration={targetGeneration}
        />

        {/* Right: Person Detail & Memory Card */}
        <PersonCard
          person={selectedPerson}
          simulationConsent={simulationConsent}
          t={t}
          onClose={handleCloseCard}
          onEnableSimulation={() => setSimulationConsent(true)}
        />
      </main>

      {/* Presentation Footer */}
      <footer className="app-footer">
        <div style={{ margin: '0 auto', textAlign: 'center', fontWeight: 500 }}>
          {t.footerEthical}
        </div>
      </footer>

      {/* Modals */}
      <RecordStoryModal
        isOpen={isRecordModalOpen}
        t={t}
        people={people}
        simulationConsent={simulationConsent}
        selectedPersonId={selectedPersonId || undefined}
        onClose={() => setIsRecordModalOpen(false)}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        t={t}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
