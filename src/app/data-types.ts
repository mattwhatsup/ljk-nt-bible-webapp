export enum BibleNameType {
  SimplifiedChiniese = 'cn',
  English = 'en',
  TraditionalChiniese = 'tr',
}

export enum BibleVersion {
  cuvs = 'cuvs',
  csbs = 'csbs',
  hcsbs = 'hcsbs',
  lebs = 'lebs',
  lzzs = 'lzzs',
  whs = 'whs',
  wlcs = 'wlcs',
}

export enum OtOrNt {
  ot = 'Ot',
  nt = 'Nt',
}

export type DataBook = {
  id: number
  name_cn: string
  name_en: string
  name_tr: string
  abbr_cn: string
  abbr_en: string
  abbr_tr: string
  chapter_count: number
  pinyin: string
  pinyin_initial: string
  ot_or_nt: OtOrNt
} & Record<string, string | number>

export type DataBookGroup = {
  id: number
  name_en: string
  name_cn: string
  name_tr: string
  abbr_cn: string
  abbr_en: string
  abbr_tr: string
} & Record<string, string | number>

export type DataVerse = {
  id: number
  book_id: number
  chapter: number
  verse: number
  strong_text: string
} & Record<string, string | number>

export enum Lang {
  Hebrew = 'H',
  Greek = 'G',
}

export type DataStrongDictItem = {
  id: number
  strong_number: string
  strong_number2: string
  i_strong_number: number
  lang: Lang
  origin: string
  latin: string
  def_en: string
  def_tr: string
  def_cn: string
  des_en: string
  des_tr: string
  des_cn: string
  class_en: string
  class_tr: string
  class_cn: string
  exclude: number
}

export type ChapterVersesCount = {
  book_id: number
  chapter: number
  verses_count: number
  book_sn: string
}
