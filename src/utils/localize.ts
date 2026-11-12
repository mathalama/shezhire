import type { Person, Version } from '../types';
import type { Language } from '../i18n';

export function getLocalizedVersion(version: Version, lang: Language): Version {
  return {
    ...version,
    text:
      lang === 'kz'
        ? (version.textKz || version.text)
        : lang === 'en'
        ? (version.textEn || version.text)
        : version.text,
    place:
      lang === 'kz'
        ? (version.placeKz || version.place)
        : lang === 'en'
        ? (version.placeEn || version.place)
        : version.place,
    teller:
      lang === 'kz'
        ? (version.tellerKz || version.teller)
        : lang === 'en'
        ? (version.tellerEn || version.teller)
        : version.teller,
    recordedBy:
      lang === 'kz'
        ? (version.recordedByKz || version.recordedBy)
        : lang === 'en'
        ? (version.recordedByEn || version.recordedBy)
        : version.recordedBy,
  };
}

export function getLocalizedPerson(person: Person, lang: Language): Person {
  return {
    ...person,
    name:
      lang === 'kz'
        ? (person.nameKz || person.name)
        : lang === 'en'
        ? (person.nameEn || person.name)
        : person.name,
    era:
      lang === 'kz'
        ? (person.eraKz || person.era)
        : lang === 'en'
        ? (person.eraEn || person.era)
        : person.era,
    versions: (person.versions || []).map((v) => getLocalizedVersion(v, lang)),
  };
}
