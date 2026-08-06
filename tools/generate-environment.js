const fs = require('fs');
const path = require('path');

// For production builds we prefer serverless proxy so front-end doesn't hold the API key.
// This script writes src/environments/environment.prod.ts with apiUrl pointing to the serverless proxy.

const targetPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

const content = `export const environment = {\n  production: true,\n  // Point to the serverless proxy that will forward requests to restcountries and inject the Authorization header\n  apiUrl: '/api/restcountries',\n  // Key is NOT stored on the client in production. Vercel must set REST_COUNTRIES_API_KEY in the project settings.\n  restCountriesApiKey: ''\n};\n`;

fs.writeFileSync(targetPath, content, { encoding: 'utf8' });
console.log('Wrote', targetPath);
