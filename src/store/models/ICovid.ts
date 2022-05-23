export interface covidCountry {
  Country: string;
  CountryCode: string;
  Date: string;
  ID: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  Premium: unknown;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface covidGlobal {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface ICovidData {
  Countries: covidCountry[];
  Date: string;
  Global: covidGlobal;
  ID: string;
  Message: string;
}
export interface IParamDate {
  to: Date | null | undefined;
  from: Date | null | undefined;
}

export interface ICovidAM {
  Cases: number
  City: string
  CityCode: string
  Country: string
  CountryCode: string
  Date: string
  Lat: string
  Lon: string
  Province: string
  Status: string
}


