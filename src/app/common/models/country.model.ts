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