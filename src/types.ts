export type SourceKind = "oral" | "written";

export interface Version {
  id: string;
  text: string;
  textKz?: string;
  textEn?: string;
  place: string;
  placeKz?: string;
  placeEn?: string;
  teller: string; // e.g. "Аксакал Бауыржан"
  tellerKz?: string;
  tellerEn?: string;
  kind: SourceKind;
  year: number;
  recordedBy?: string;
  recordedByKz?: string;
  recordedByEn?: string;
}

export interface Person {
  id: string;
  name: string; // Russian (default)
  nameKz?: string;
  nameEn?: string;
  generation: number; // 1 (oldest) .. 7 (youngest)
  era?: string;
  eraKz?: string;
  eraEn?: string;
  fatherId: string | null;
  isLiving: boolean;
  consentToShow: boolean;
  isUnknown: boolean;
  versions: Version[];
}
