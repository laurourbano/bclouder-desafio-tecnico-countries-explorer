export interface Country {
    name: {
        common: string;
        official: string;
    };
    capital: string[];
    population: number;
    region: string;
    subregion: string;
    flags: {
        png: string;
        svg: string;
    };
}

