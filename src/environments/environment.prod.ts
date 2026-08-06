export const environment = {
    production: true,
    // In production the app should call the serverless proxy so the API key is not exposed.
    apiUrl: '/api/restcountries',
    // Key is NOT stored on the client in production. Vercel should set REST_COUNTRIES_API_KEY.
    restCountriesApiKey: ''
};
