export interface Country {
  name: string
  countryCode: string,
}

export interface CountryInfo {
  commonName: string,
  officialName: string,
  countryCode: string,
  region: string,
  borders: CountryInfo | null;
}

export interface Holiday {
  date: Date,
  localName: string,
  name: string,
  countryCode: string,
  fixed?: boolean,
  global?: boolean,
  types?: [
    "Public"
  ]
} 