export type Language = 'ru' | 'kz' | 'en';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  consentToggle: string;
  recordStoryBtn: string;
  aboutBtn: string;
  navHeader: string;

  // Generation names (from Gen 1 down to Gen 7)
  generations: {
    [key: number]: {
      name: string;
      role: string;
      era: string;
    };
  };

  // Node badges & helpers
  versionsCount: (count: number) => string;
  versionTab: (index: number, teller: string) => string;
  livingConsentGiven: string;
  livingHidden: string;
  consentRequired: string;
  unknownName: string;
  preservedGap: string;
  oralBadge: string;
  writtenBadge: string;

  // Person Card
  genOfTotal: (gen: number) => string;
  unknownCardTitle: string;
  unknownCardNotice: string;
  unknownCardDesc: string;
  hiddenLivingTitle: string;
  hiddenLivingNotice: string;
  hiddenLivingDesc: string;
  simulateConsentBtn: string;
  disputeNote: string;
  toldBy: string;
  recordedBy: string;
  noStories: string;
  culturalNote: string;

  // Modal Record Story
  recordModalTitle: string;
  recordSuccessTitle: string;
  recordMockNotice: string;
  selectPerson: string;
  storyTextLabel: string;
  storyPlaceholder: string;
  placeLabel: string;
  placePlaceholder: string;
  yearLabel: string;
  tellerLabel: string;
  tellerRequired: string;
  tellerPlaceholder: string;
  tellerHintEmpty: string;
  tellerHintFilled: string;
  sourceTypeLabel: string;
  oralOption: string;
  writtenOption: string;
  recordedByLabel: string;
  recordedByPlaceholder: string;
  cancelBtn: string;
  saveBtn: string;

  // About Modal
  aboutTitle: string;
  philosophyTitle: string;
  philosophyText: string;
  attributionTitle: string;
  attributionText: string;
  gapsTitle: string;
  gapsText: string;
  ethicalTitle: string;
  ethicalText: string;
  ethicalSubtext: string;
  closeBtn: string;

  // Footer
  footerEthical: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: 'Шежіре · Память поколений',
    appSubtitle: 'Устная традиция и родовая память семи поколений',
    consentToggle: 'Согласие дано (симуляция)',
    recordStoryBtn: 'Записать рассказ старейшины',
    aboutBtn: 'О проекте',
    navHeader: '7 поколений',

    generations: {
      1: { name: '1-ші ата', role: 'Түп ата (Основатель)', era: '~1820-е гг.' },
      2: { name: '2-ші ата', role: 'Тұқиян (Праотцы)', era: '~1850-е гг.' },
      3: { name: '3-ші ата', role: 'Арғы ата (Пращуры)', era: '~1880-е гг.' },
      4: { name: '4-ші ата', role: 'Бабалар (Прадеды)', era: '~1910-е гг.' },
      5: { name: '5-ші ата', role: 'Аталар (Деды)', era: '~1930–1940-е' },
      6: { name: '6-шы ата', role: 'Әкелер (Отцы)', era: '~1970-е гг.' },
      7: { name: '7-ші ата', role: 'Балалар / Ұрпақ (Живые)', era: '~2000-е — наст. вр.' },
    },

    versionsCount: (n) => (n === 2 ? '2 версии' : `${n} версий`),
    versionTab: (index, teller) => `Версия ${index} · ${teller}`,
    livingConsentGiven: 'Жив · согласие дано',
    livingHidden: 'Живущий родственник · скрыто',
    consentRequired: 'Требуется согласие',
    unknownName: 'Имя не сохранилось',
    preservedGap: 'Естественный пробел в линии',
    oralBadge: 'Устно',
    writtenBadge: 'Письменно',

    genOfTotal: (g) => `Поколение ${g} из 7`,
    unknownCardTitle: 'Неизвестный предок',
    unknownCardNotice: 'Имя этого предка не сохранилось (период невзгод и переселений 1930-х гг.). Пробелы — естественная часть шежире.',
    unknownCardDesc: 'Устная традиция бережно хранит непрерывность рода даже тогда, когда конкретное имя стирается временем. Связь поколений не прерывается через пробел.',
    hiddenLivingTitle: 'Живущий родственник',
    hiddenLivingNotice: 'Этот человек жив. Его личные данные и истории открываются только с его согласия.',
    hiddenLivingDesc: 'В современной цифровой памяти уважается автономия ныне живущих. Вы можете включить режим симуляции в шапке, чтобы открыть профиль.',
    simulateConsentBtn: 'Смоделировать согласие',
    disputeNote: 'Родственники помнят это по-разному. Обе версии сохранены; ни одна не признана единственно верной.',
    toldBy: 'Рассказал(а)',
    recordedBy: 'Записал(а)',
    noStories: 'Для этого предка пока не записано историй.',
    culturalNote: 'Каждое устное воспоминание принадлежит его рассказчику. В шежире история жива, пока звучит голос свидетеля.',

    recordModalTitle: 'Записать рассказ старейшины',
    recordSuccessTitle: 'Воспоминание зафиксировано',
    recordMockNotice: 'Это демонстрационный макет. Данные не сохраняются в базу.',
    selectPerson: 'Предок или родственник',
    storyTextLabel: 'Текст воспоминания',
    storyPlaceholder: 'Запишите то, что вспомнил или пересказал очевидец...',
    placeLabel: 'Местность / регион',
    placePlaceholder: 'напр. Карагандинская обл. (Каркаралы)',
    yearLabel: 'Год фиксации',
    tellerLabel: 'КТО рассказал',
    tellerRequired: '* (Обязательно)',
    tellerPlaceholder: 'напр. Аксакал Бауыржан, Тетя Жанар',
    tellerHintEmpty: 'История без рассказчика не сохраняется.',
    tellerHintFilled: 'Каждое свидетельство в шежире должно иметь автора.',
    sourceTypeLabel: 'Тип источника',
    oralOption: 'Устный (рассказ, предание)',
    writtenOption: 'Письменный (тетрадь, мемуары)',
    recordedByLabel: 'КТО записал (если отличается)',
    recordedByPlaceholder: 'напр. его потомок Данияр',
    cancelBtn: 'Отмена',
    saveBtn: 'Сохранить запись',

    aboutTitle: 'О проекте Шежіре',
    philosophyTitle: 'Философия живой памяти',
    philosophyText: 'Шежире — это не холодная база данных и не сухая перепись. Оно живо лишь до тех пор, пока передаётся из уст в уста. Если свести его к таблицам, факты останутся, но исчезнет само повествование и живой голос предков.',
    attributionTitle: 'Почему история не может быть анонимной',
    attributionText: 'Любое воспоминание неразрывно связано с тем, кто его хранил. Безымянные факты обесценивают устную традицию. Когда разные ветви семьи помнят события по-разному, их версии сохраняются на равных правах.',
    gapsTitle: 'Пробелы и приватность',
    gapsText: 'Забытые имена воспринимаются с почтением, а не как «ошибка базы данных». Живущие родственники защищены принципом осознанного согласия.',
    ethicalTitle: 'Этическая позиция дизайна',
    ethicalText: 'В этом проекте принципиально отсутствуют рейтинги, статистика по родам и сравнения ветвей.',
    ethicalSubtext: 'Память семьи — это общее достояние, а не повод для статусного соперничества.',
    closeBtn: 'Понятно',

    footerEthical: 'В этом проекте принципиально отсутствуют рейтинги, статистика по родам и сравнения ветвей.',
  },

  kz: {
    appTitle: 'Шежіре · Ата-бабалар аманаты',
    appSubtitle: 'Жеті ата жады және тірі ауызша шежіре',
    consentToggle: 'Келісім берілді (симуляция)',
    recordStoryBtn: 'Ақсақал естелігін жазу',
    aboutBtn: 'Жоба туралы',
    navHeader: '7 ата жады',

    generations: {
      1: { name: '1-ші ата', role: 'Түп ата (Түп негіз)', era: '~1820 жж.' },
      2: { name: '2-ші ата', role: 'Тұқиян (Арғы аталар)', era: '~1850 жж.' },
      3: { name: '3-ші ата', role: 'Арғы ата (Ата-баба)', era: '~1880 жж.' },
      4: { name: '4-ші ата', role: 'Бабалар (Үлкен аталар)', era: '~1910 жж.' },
      5: { name: '5-ші ата', role: 'Аталар (Ата буыны)', era: '~1930–1940 жж.' },
      6: { name: '6-шы ата', role: 'Әкелер (Әкелер буыны)', era: '~1970 жж.' },
      7: { name: '7-ші ата', role: 'Балалар / Ұрпақ (Қазіргі)', era: '~2000 жж. — бүгін' },
    },

    versionsCount: (n) => `${n} түрлі естелік`,
    versionTab: (index, teller) => `${index}-нұсқа · ${teller}`,
    livingConsentGiven: 'Тірі · келісім алынған',
    livingHidden: 'Тірі туыс · жасырын',
    consentRequired: 'Келісім қажет',
    unknownName: 'Есімі сақталмаған',
    preservedGap: 'Шежіредегі табиғи үзік',
    oralBadge: 'Ауызша',
    writtenBadge: 'Жазбаша',

    genOfTotal: (g) => `7 атаның ${g}-ші буыны`,
    unknownCardTitle: 'Есімі беймәлім баба',
    unknownCardNotice: 'Бұл бабаның есімі сақталмаған (1930 жылдардағы ашаршылық пен босқыншылық кезеңі). Тарихи үзіктер — шежіренің табиғи бөлігі.',
    unknownCardDesc: 'Ауызша шежіре дәстүрі белгілі бір есім ұмытылса да, ұрпақтар сабақтастығын үзбей сақтайды.',
    hiddenLivingTitle: 'Тірі туыс',
    hiddenLivingNotice: 'Бұл кісі қазір өмір сүруде. Оның деректері тек жеке келісімімен көрсетіледі.',
    hiddenLivingDesc: 'Заманауи цифрлық шежіре тірі адамдардың дербестігін құрметтейді.',
    simulateConsentBtn: 'Келісім беруді симуляциялау',
    disputeNote: 'Туыстар бұл оқиғаны әртүрлі еске алады. Екі нұсқа да сақталған; ешқайсысы «дұрыс» деп таңдалмайды.',
    toldBy: 'Баяндаған',
    recordedBy: 'Жазып алған',
    noStories: 'Бұл ата туралы әзірге жазылған естелік жоқ.',
    culturalNote: 'Әрбір ауызша әңгіме оны айтқан адамның атымен құнды. Шежіре әңгімелеушінің дауысымен тірі.',

    recordModalTitle: 'Ақсақал естелігін жазу',
    recordSuccessTitle: 'Естелік қабылданды',
    recordMockNotice: 'Бұл демо макеті. Деректер базаға сақталмайды.',
    selectPerson: 'Баба немесе туыс',
    storyTextLabel: 'Естелік мәтіні',
    storyPlaceholder: 'Ақсақалдың немесе куәгердің айтқан сөздерін жазыңыз...',
    placeLabel: 'Өңір / Мекен',
    placePlaceholder: 'мыс. Қарағанды обл. (Қарқаралы)',
    yearLabel: 'Айтылған жылы',
    tellerLabel: 'КІМ айтты',
    tellerRequired: '* (Міндетті)',
    tellerPlaceholder: 'мыс. Бауыржан ақсақал, Жанар апай',
    tellerHintEmpty: 'Айтқан адамы белгісіз әңгіме сақталмайды.',
    tellerHintFilled: 'Шежіреде әр сөздің иесі болуы тиіс.',
    sourceTypeLabel: 'Дерек түрі',
    oralOption: 'Ауызша (шежіре сөз, естелік)',
    writtenOption: 'Жазбаша (қолжазба, шежіре дәптер)',
    recordedByLabel: 'КІМ жазып алды (басқа адам болса)',
    recordedByPlaceholder: 'мыс. ұрпағы Данияр',
    cancelBtn: 'Бас тарту',
    saveBtn: 'Жазбаны сақтау',

    aboutTitle: 'Шежіре жобасы туралы',
    philosophyTitle: 'Тірі жад философиясы',
    philosophyText: 'Шежіре — жай ғана кесте немесе адамдар тізімі емес. Ол біреу оны айтып отырғанда ғана тірі болады.',
    attributionTitle: 'Неліктен авторсыз оқиға болмайды',
    attributionText: 'Әр естелік оны жеткізген адамның атымен қатар жүреді. Туыстар бір оқиғаны әртүрлі айтса, екі нұсқа да тең сақталады.',
    gapsTitle: 'Үзіктер мен құпиялылық',
    gapsText: 'Ұмытылған есімдер қалыпты құбылыс ретінде қабылданады. Ал тірі ұрпақтардың жеке өмірі қорғалған.',
    ethicalTitle: 'Этикалық ұстаным',
    ethicalText: 'Бұл жобада рулық рейтингтер, статистика және тармақтарды салыстыру әдейі қарастырылмаған.',
    ethicalSubtext: 'Отбасы тарихы — бәсеке емес, ортақ қасиетті жад.',
    closeBtn: 'Түсінікті',

    footerEthical: 'Бұл жобада рулық рейтингтер, статистика және тармақтарды салыстыру әдейі қарастырылмаған.',
  },

  en: {
    appTitle: 'Shezhire · Living Lineage Memory',
    appSubtitle: 'Oral Genealogy & Memory of Seven Generations',
    consentToggle: 'Consent given (simulation)',
    recordStoryBtn: "Record an elder's story",
    aboutBtn: 'About',
    navHeader: '7 Generations',

    generations: {
      1: { name: 'Gen 1', role: 'Root Ancestor (Түп ата)', era: '~1820s' },
      2: { name: 'Gen 2', role: 'Forefathers (Тұқиян)', era: '~1850s' },
      3: { name: 'Gen 3', role: 'Ancestral Elders (Арғы ата)', era: '~1880s' },
      4: { name: 'Gen 4', role: 'Great-grandfathers (Бабалар)', era: '~1910s' },
      5: { name: 'Gen 5', role: 'Grandfathers (Аталар)', era: '~1930s-1940s' },
      6: { name: 'Gen 6', role: 'Fathers (Әкелер)', era: '~1970s' },
      7: { name: 'Gen 7', role: 'Living Generation (Балалар)', era: '~2000s — present' },
    },

    versionsCount: (n) => `${n} versions`,
    versionTab: (index, teller) => `Version ${index} · ${teller}`,
    livingConsentGiven: 'Living · consent given',
    livingHidden: 'Living relative · hidden',
    consentRequired: 'Consent needed',
    unknownName: 'Unknown',
    preservedGap: 'Preserved lineage gap',
    oralBadge: 'Oral',
    writtenBadge: 'Written',

    genOfTotal: (g) => `Generation ${g} of 7`,
    unknownCardTitle: 'Unknown Ancestor',
    unknownCardNotice: "This ancestor's name has not been preserved (displacements of the 1930s). Gaps are a normal part of a shezhire.",
    unknownCardDesc: 'Oral genealogical tradition maintains the continuum of generations even when an individual name has passed beyond living memory. The line continues unbroken.',
    hiddenLivingTitle: 'Living Relative',
    hiddenLivingNotice: 'This person is alive. Their data is shown only with their consent.',
    hiddenLivingDesc: 'Modern shezhire respects living family members. Details and stories are concealed until explicit permission is granted.',
    simulateConsentBtn: 'Simulate granting consent',
    disputeNote: 'Relatives remember this differently. Both versions are kept; none is marked as correct.',
    toldBy: 'Told by',
    recordedBy: 'Recorded by',
    noStories: 'No stories currently recorded for this ancestor.',
    culturalNote: 'Every oral account belongs to its storyteller. In Shezhire, stories are kept alive by acknowledging who spoke them.',

    recordModalTitle: "Record an Elder's Story",
    recordSuccessTitle: 'Story Recorded',
    recordMockNotice: 'This is a mockup. Nothing is saved to a database.',
    selectPerson: 'Ancestor / Relative',
    storyTextLabel: 'Story text',
    storyPlaceholder: 'Record what was remembered or recounted by the elder...',
    placeLabel: 'Place / Region',
    placePlaceholder: 'e.g. Karaganda region (Karkaraly)',
    yearLabel: 'Year of Telling',
    tellerLabel: 'Told by',
    tellerRequired: '* (Required)',
    tellerPlaceholder: 'e.g. Aksakal Bauyrzhan, Aunt Zhanar',
    tellerHintEmpty: 'A story without a teller is not saved.',
    tellerHintFilled: 'Every story in shezhire must have an attributed voice.',
    sourceTypeLabel: 'Source Type',
    oralOption: 'Oral (spoken testimony)',
    writtenOption: 'Written (family notebook, memoir)',
    recordedByLabel: 'Recorded by (if different)',
    recordedByPlaceholder: 'e.g. his descendant Daniyar',
    cancelBtn: 'Cancel',
    saveBtn: 'Save Story Record',

    aboutTitle: 'About Shezhire',
    philosophyTitle: 'The Philosophy of Living Memory',
    philosophyText: 'In Kazakh tradition, a shezhire is not a cold genealogical ledger or census table. It stays alive as long as someone tells it to another person. If you turn it into a plain database, the facts stay but the living voice and the telling are lost.',
    attributionTitle: 'Why Stories Are Never Anonymous',
    attributionText: 'In this digital memory system, every narrative is inextricably tied to its teller. A story without a teller cannot be recorded. When multiple relatives remember an ancestor or an event differently, their accounts sit side by side as equals.',
    gapsTitle: 'Gaps and Privacy',
    gapsText: 'Gaps in memory are natural across centuries and are treated with dignity rather than error indicators. Likewise, living relatives are shielded by default, preserving autonomy and consent.',
    ethicalTitle: 'Ethical Design Stance',
    ethicalText: 'This demo intentionally has no rankings, statistics or lineage comparisons.',
    ethicalSubtext: 'Family history is a sacred communal memory, not a competition or metric of status.',
    closeBtn: 'Understood',

    footerEthical: 'This demo intentionally has no rankings, statistics or lineage comparisons.',
  },
};
