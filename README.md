# 🌍 Countries Explorer

Aplicação web desenvolvida com Angular para exploração de dados de países utilizando a API pública REST Countries.

Projeto construído como desafio técnico, com foco em arquitetura escalável, boas práticas e experiência do usuário.

🚀 Live Demo

🔗 <https://bclouder-desafio-tecnico-countries.vercel.app/>

📌 Principais Funcionalidades
🔎 Busca de países por nome (com debounce e reatividade)
🌎 Filtro por região
📊 Ordenação dinâmica de colunas
📄 Paginação de resultados
📱 Layout totalmente responsivo
📍 Página de detalhes do país
🔗 Exibição de países fronteiriços
🔄 Navegação entre países relacionados
🧠 Arquitetura e Boas Práticas

O projeto foi estruturado seguindo boas práticas modernas do Angular:

📦 Arquitetura modular (Core / Shared / Features)
🔁 Uso de RxJS para controle de fluxo e reatividade
🧩 Separação clara de responsabilidades (Service Layer)
🧱 Componentes reutilizáveis
🎯 Tipagem forte com TypeScript
🎨 UI consistente com Angular Material
🛠️ Tecnologias
Angular
TypeScript
Angular Material
RxJS
Ngx-Toastr
REST Countries API
🌐 API

Base URL:

<https://restcountries.com/v3.1>

Endpoint principal:

<https://restcountries.com/v3.1/all>
Dados consumidos:
Nome
Bandeira
Capital
População
Região
Idiomas
Moedas
Países fronteiriços
📚 Documentação para Iniciantes

Se você está começando agora e quer entender cada parte do projeto, leia o guia completo:

👉 **[GUIA_DO_PROJETO.md](./GUIA_DO_PROJETO.md)** — explicado com linguagem simples, sem jargões técnicos. Inclui fluxo de dados, glossário e passo a passo.

⚙️ Instalação
git clone <https://github.com/laurourbano/bclouder-desafio-tecnico-countries-explorer>
cd bclouder-desafio-tecnico-countries-explorer
npm install
▶️ Execução
ng serve -o

Acesse:

<http://localhost:4200>
📦 Build de Produção
ng build --configuration production

Saída:

dist/
🏗️ Estrutura do Projeto
src/
│
├── app/
│   ├── core/         # modelos e serviços globais
│   ├── features/     # módulos de funcionalidades (home, detail)
│   ├── shared/       # módulos compartilhados (Material, componentes)
│
└── environments/
📱 Responsividade

Desktop

Tabela completa com ordenação e paginação

Mobile

Layout simplificado
Navegação otimizada por toque
Melhor legibilidade e performance
📍 Página de Detalhes
Nome oficial
Capital
População
Área
Idiomas
Moedas
Países fronteiriços com navegação
💡 Diferenciais
Código limpo e organizado
Estrutura pronta para escalar
Separação clara entre UI e lógica de negócio
Experiência de usuário fluida
Uso consistente de tipagem forte
📬 Contato

Lauro Otávio Urbano

LinkedIn: <https://www.linkedin.com/in/laurourbano>
GitHub: <https://github.com/laurourbano>
WhatsApp: +55 (41) 99808-6077
📄 Licença

Projeto desenvolvido para fins educacionais e avaliação técnica.
