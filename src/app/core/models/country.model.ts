export interface Country {

  name: {
    common: string;
    official: string;
  };

  cca3: string;

  capital: string[];

  population: number;

  region: string;

  subregion: string;

  borders: string[];

  flags: {
    png: string;
    svg: string;
  };

  languages: Record<string, string>;

  currencies: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;

  area: string;

  code: string;

}
