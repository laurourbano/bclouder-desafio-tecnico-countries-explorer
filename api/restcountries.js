const API_BASE = 'https://api.restcountries.com/countries/v5';

module.exports = async (req, res) => {
  try {
    // Build target URL by appending path + query
    const originalUrl = req.url || '';
    // originalUrl starts with /api/restcountries
    const suffix = originalUrl.replace(/^\/api\/restcountries/, '') || '';
    const target = API_BASE + suffix;

    const headers = {};
    // copy incoming headers except host
    Object.keys(req.headers || {}).forEach((k) => {
      if (k.toLowerCase() === 'host') return;
      headers[k] = req.headers[k];
    });

    const key = process.env.REST_COUNTRIES_API_KEY || '';
    if (key) headers['Authorization'] = `Bearer ${key}`;

    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (req.method && !['GET', 'HEAD'].includes(req.method.toUpperCase())) {
      // collect body
      const body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
      fetchOptions.body = body;
    }

    const response = await fetch(target, fetchOptions);

    // forward status
    res.status(response.status);

    // forward headers (some headers like transfer-encoding will be ignored by Node)
    response.headers.forEach((value, name) => {
      try {
        res.setHeader(name, value);
      } catch (e) {
        // ignore invalid headers
      }
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (err) {
    console.error('proxy error', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Proxy error' }));
  }
};
