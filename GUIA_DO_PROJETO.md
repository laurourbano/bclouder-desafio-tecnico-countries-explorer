# 📖 Guia do Projeto — Countries Explorer

> **Para quem é este guia:** Desenvolvedores iniciantes (nível júnior) que querem entender como o projeto funciona por dentro.
> Aqui evitamos termos técnicos complicados. Quando algum termo for inevitável, ele vai estar explicado no [glossário](#glossário) no final.

---

## 🎯 O que esse projeto faz?

É um site que mostra informações sobre todos os países do mundo. O usuário pode:

- Ver uma lista de países com bandeira, nome, capital, população e região
- **Buscar** um país pelo nome (digitando no campo de busca)
- **Filtrar** por região (ex: Europa, Ásia, Américas)
- **Ordenar** a lista por nome, população etc. (clicando no título da coluna)
- **Navegar** entre páginas (paginação)
- **Clicar** em um país para ver detalhes como idiomas, moedas e países que fazem fronteira
- **Trocar** o idioma da interface (inglês, português, espanhol, francês, alemão)
- **Alternar** entre tema claro e tema escuro

Os dados vêm de uma API pública chamada [REST Countries](https://restcountries.com). O site apenas consulta esses dados — não salva nada no banco de dados.

👉 **Site no ar:** [https://bclouder-desafio-tecnico-countries.vercel.app/](https://bclouder-desafio-tecnico-countries.vercel.app/)

---

## 🧱 As peças do quebra-cabeça (tecnologias usadas)

Pense no projeto como uma casa. Cada tecnologia é uma parte diferente da construção:

| Tecnologia | O que faz? | Analogia |
|---|---|---|
| **Angular** | O "esqueleto" do site — organiza tudo em componentes | É como a estrutura de concreto da casa |
| **TypeScript** | Uma versão melhorada do JavaScript, que avisa quando você comete erros antes mesmo de abrir o site | É como um corretor ortográfico que funciona enquanto você digita o código |
| **Angular Material** | Biblioteca de componentes visuais prontos (botões, tabelas, menus, campos de texto) | São os móveis e eletrodomésticos prontos — você não precisa construir uma mesa do zero |
| **RxJS** | Controla o fluxo de dados que chegam da internet (API) | É como um encanamento que traz água (dados) para dentro de casa |
| **SCSS** | Uma versão turbinada do CSS que permite usar variáveis e funções | É como pintar a casa com uma tinta que muda de cor conforme a luz |
| **Karma + Jasmine** | Ferramentas que testam automaticamente se cada pedaço do código funciona | É como um inspetor de obras que verifica cada parede e tomada |

---

## 📁 Estrutura de pastas (explicada de forma simples)

```
src/
└── app/
    ├── core/           ← O "coração" do projeto. Tudo que é essencial e usado por toda a aplicação.
    │   ├── config/     ← Arquivos de configuração (idiomas disponíveis, traduções)
    │   ├── interceptors/ ← "Guardas" que vigiam toda requisição de internet
    │   ├── mappers/    ← "Tradutores" que convertem o formato da API para o formato do nosso app
    │   ├── models/     ← "Fichas técnicas" — descrevem o formato dos dados
    │   └── services/   ← "Entregadores" — vão buscar dados na internet
    │
    ├── features/       ← As "páginas" do site
    │   ├── home/       ← Página inicial (lista de países)
    │   └── detail/     ← Página de detalhes de um país
    │
    ├── shared/         ← Coisas que são reaproveitadas em várias partes
    │   ├── components/ ← Pequenos componentes (ex: seletor de idioma)
    │   ├── material/   ← Configuração do Angular Material
    │   └── pipes/      ← "Filtros" que transformam dados na tela (ex: traduzir nome do país)
    │
    ├── app.ts          ← O componente principal — é a "moldura" do site (cabeçalho + conteúdo)
    ├── app.routes.ts   ← Mapa de navegação — qual URL leva a qual página
    └── app.config.ts   ← Configurações gerais do aplicativo
```

### Como as pastas se comunicam?

Imagine uma empresa com três andares:

```
┌─────────────────────────────────┐
│         SHARED (térreo)         │  ← Todo mundo pode usar
│  Componentes, Pipes, Material   │
└─────────────────────────────────┘
          ↑              ↑
          │              │
┌─────────┴──┐   ┌──────┴─────────┐
│  FEATURES  │   │     FEATURES    │  ← Cada página é independente
│   Home     │   │     Detail      │
└────────────┘   └────────────────┘
          ↑              ↑
          │              │
┌─────────┴──────────────┴─────────┐
│            CORE (subsolo)         │  ← Dá suporte para tudo
│  Services, Models, Mappers       │
└──────────────────────────────────┘
```

**Regra de ouro:**
- **Features** (páginas) nunca conversam diretamente entre si
- **Features** pedem dados para o **Core** (services)
- **Shared** é usado por qualquer um
- **Core** é o único que conversa com a internet (API)

---

## 🔄 O caminho dos dados (como a mágica acontece)

Vamos seguir um exemplo: o usuário digita "Brazil" na busca.

```
[1] USUÁRIO digita "Brazil" no campo de busca
        │
        ▼
[2] HOME (home.ts) escuta o que foi digitado
        │    └── Espera 300ms para ver se o usuário parou de digitar (debounce)
        │
        ▼
[3] HOME chama: countryService.search("Brazil")
        │
        ▼
[4] COUNTRY SERVICE (country-service.ts)
        │    └── Monta a URL: https://restcountries.com/v3.1/name/Brazil?fields=...
        │    └── Faz a requisição HTTP (como abrir uma página no navegador)
        │
        ▼
[5] API REST COUNTRIES responde com JSON (dados brutos)
        │    └── Ex: { "name": { "common": "Brazil", "official": "Federative Republic of Brazil" }, ... }
        │
        ▼
[6] COUNTRY MAPPER (country.mapper.ts)
        │    └── Converte o JSON da API para o formato que o app entende (modelo Country)
        │    └── Cria um campo "searchableText" para facilitar buscas
        │
        ▼
[7] COUNTRY SERVICE guarda os dados em um "signal" (variável reativa)
        │
        ▼
[8] HOME detecta que o signal mudou e ATUALIZA A TABELA automaticamente
        │
        ▼
[9] USUÁRIO vê os resultados na tela ✅
```

**Conceito importante — Signal (variável reativa):**
- É como um alarme: quando o valor muda, todo mundo que está "ouvindo" é avisado automaticamente
- Não precisa ficar verificando manualmente se algo mudou

---

## 🧩 Explicação de cada arquivo importante

### 🔵 Core (o coração)

#### `services/country-service.ts` — O entregador de dados
- Esse serviço é o único que conversa com a API REST Countries
- Tem 4 métodos principais:
  - `getAll()` → busca todos os países
  - `search(nome)` → busca países por nome
  - `byRegion(regiao)` → filtra países por região (África, Europa, etc.)
  - `byCca3(codigo)` → busca um país específico pelo código de 3 letras (ex: BRA, USA)
- Guarda o resultado em um **signal** (variável que avisa o resto do app quando muda)
- Só faz uma requisição por vez para não sobrecarregar a API

#### `services/language-service.ts` — O gerente de idiomas
- Controla em qual idioma a interface aparece (português, inglês, espanhol, francês, alemão)
- Salva a escolha do usuário no **localStorage** (memória do navegador)
- Quando o idioma muda, todos os textos da tela mudam automaticamente

#### `services/theme.service.ts` — O interruptor de tema
- Alterna entre tema claro (fundo branco) e tema escuro (fundo escuro)
- Também salva a preferência no localStorage
- Adiciona/remove uma classe CSS chamada `dark-theme` no elemento `<html>`

#### `mappers/country.mapper.ts` — O tradutor de dados
- A API retorna os dados em um formato cheio de campos aninhados
- O mapper pega essa "bagunça" e transforma em um objeto limpo e organizado
- Também cria um campo `searchableText` que junta nome + capital + traduções
  - Isso permite que o usuário busque "Brasília" e encontre o Brasil

#### `models/` — As fichas técnicas
- `country.model.ts` → define quais campos um país tem no nosso app (nome, bandeira, população, etc.)
- `rest-countries.model.ts` → define o formato que a API devolve (é diferente do nosso modelo!)
- **Por que dois modelos?** Se a API mudar o formato dos dados amanhã, só precisamos ajustar o mapper. O resto do app continua funcionando.

#### `interceptors/error.interceptor.ts` — O guarda de erros
- Toda requisição de internet passa por esse "guarda"
- Se algo der errado (internet caiu, API fora do ar), ele mostra uma mensagem de erro na tela
- Usa a biblioteca **ngx-toastr** para mostrar um aviso no canto da tela

#### `config/` — As configurações
- `languages.config.ts` → lista de idiomas suportados (código + nome)
- `ui.translations.config.ts` → todas as traduções de todos os textos da interface (botões, tabelas, mensagens)

---

### 🟢 Features (as páginas)

#### `home/home.ts` — A página inicial

Essa é a página mais complexa. Ela:

1. **Carrega os países** ao abrir a página (usando o CountryService)
2. **Mostra uma tabela** com bandeira, nome, capital, população e região
3. **Busca com pausa inteligente (debounce):** espera 300ms após o usuário parar de digitar antes de buscar
   - Isso evita fazer 10 requisições enquanto o usuário digita "B-r-a-s-i-l"
4. **Filtro por região:** um menu dropdown com as opções (África, Américas, Ásia, Europa, Oceania)
5. **Filtro combinado:** o usuário pode digitar um nome E selecionar uma região ao mesmo tempo
6. **Ordenação:** clicando no título de qualquer coluna, a tabela ordena por aquele campo
7. **Paginação:** mostra 10 países por vez, com botões para avançar/voltar
8. **Layout responsivo:** no celular, esconde algumas colunas para caber na tela
9. **Animação:** os países aparecem um por um (efeito stagger) e há um "esqueleto" de carregamento
10. **Ao clicar em um país** → navega para a página de detalhes

#### `detail/detail.ts` — A página de detalhes

Essa página:

1. **Pega o código do país** da URL (ex: `/countries/BRA` → código = "BRA")
2. **Busca os dados** daquele país na API
3. **Mostra:** bandeira grande, nome oficial, capital, população, área, idiomas, moedas
4. **Países fronteiriços:** mostra chips (etiquetas) com os países que fazem fronteira
   - Clicando no chip, navega para a página de detalhes daquele país
5. **Botão voltar** para retornar à lista
6. **Tratamento de erro:** se o país não existir, mostra uma mensagem amigável

---

### 🟡 Shared (componentes compartilhados)

#### `components/language-select/` — Seletor de idioma
- Fica no cabeçalho do site
- Mostra o idioma atual com um ícone de globo 🌐
- Ao clicar, abre um menu com as 5 opções de idioma
- O idioma ativo aparece com um check ✓

#### `pipes/translate-country.pipe.ts` — Traduz nome de país
- Se o idioma for inglês, usa `country.name` (nome nativo)
- Se for outro idioma, busca em `country.translations` (ex: `translations.por.common` = "Brasil")
- Se não encontrar a tradução, usa o inglês como fallback (plano B)

#### `pipes/translate-region.pipe.ts` — Traduz nome de região
- Ex: "Europe" → "Europa" (português) / "Europe" (francês)
- Também tem fallback para inglês

#### `material/material.config.ts` — Lista de componentes visuais
- Centraliza todos os componentes do Angular Material que o projeto usa
- Evita ter que importar a mesma coisa em vários lugares

---

### 🔴 App (a raiz)

#### `app.ts` — A moldura do site
- Contém o **cabeçalho** (barra superior com logo, nome, seletor de idioma, botão de tema)
- Contém o **`<router-outlet>`** — é aqui que a mágica acontece:
  - Quando a URL é `/` → o Angular coloca a Home aqui dentro
  - Quando a URL é `/countries/BRA` → o Angular coloca a Detail aqui dentro
  - O cabeçalho permanece sempre visível (não recarrega)

#### `app.routes.ts` — O mapa de navegação
Define qual componente aparece em cada endereço (URL):

| URL | O que aparece | Como carrega |
|---|---|---|
| `/` | Página Home | Só carrega quando o usuário acessar (lazy loading) |
| `/countries/:cca3` | Página Detail | Só carrega quando o usuário acessar (lazy loading) |
| Qualquer outra URL | Redireciona para `/` | — |

**Lazy loading** = "carregamento preguiçoso". O código da página só é baixado quando o usuário realmente acessa aquela página. Isso deixa o site mais rápido no primeiro carregamento.

#### `app.config.ts` — As configurações globais
- Registra os "serviços" que o app precisa (roteamento, animações, cliente HTTP, notificações toast)
- Configura o ngx-toastr (duração de 3 segundos, canto inferior direito)

---

## 🚀 Como rodar o projeto no seu computador

### Pré-requisitos (o que você precisa instalar)

1. **Node.js** (versão 20 ou superior) — [baixar aqui](https://nodejs.org)
   - O Node.js é um programa que permite rodar JavaScript no computador (fora do navegador)
2. **npm** — vem junto com o Node.js
   - npm é o "gerenciador de pacotes" — baixa as bibliotecas que o projeto precisa
3. **Git** — [baixar aqui](https://git-scm.com) (opcional, para clonar o projeto)
4. **Angular CLI** — ferramenta de linha de comando do Angular

### Passo a passo

```bash
# 1. Baixar o projeto (clone)
git clone https://github.com/laurourbano/bclouder-desafio-tecnico-countries-explorer
# ou baixe o ZIP do GitHub e extraia

# 2. Entrar na pasta do projeto
cd bclouder-desafio-tecnico-countries-explorer

# 3. Instalar as dependências (bibliotecas que o projeto usa)
npm install
# ⏳ Isso pode demorar alguns minutos na primeira vez

# 4. Rodar o projeto (servidor de desenvolvimento)
npm start
# ou
ng serve -o
# A flag -o já abre o navegador automaticamente

# 5. Acessar no navegador
# http://localhost:4200
```

### Comandos úteis

| Comando | O que faz |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento (modifica o site ao vivo enquanto você edita) |
| `npm run build` | Gera os arquivos finais para colocar no ar (pasta `dist/`) |
| `npm test` | Roda todos os testes automatizados |
| `npm run watch` | Fica vigiando mudanças e regera o build automaticamente |

---

## 🧪 Como testar o projeto

O projeto tem **testes automatizados**. Pense nos testes como um robô que verifica se cada parte do código está funcionando corretamente.

```bash
# Rodar todos os testes
npm test

# Rodar os testes e ver a cobertura (quanto do código está sendo testado)
ng test --code-coverage
```

Os testes estão nos arquivos com final `.spec.ts`. Cada componente/serviço tem seu próprio arquivo de teste.

**Exemplo:** o arquivo `home.spec.ts` testa se a página inicial:
- Carrega a lista de países corretamente
- Filtra quando o usuário digita algo
- Ordena a tabela quando clica no título da coluna
- Mostra mensagem de erro se a API falhar
- Navega para a página de detalhes quando clica em um país

A cobertura mínima exigida é **80%** — ou seja, pelo menos 80% do código precisa passar por algum teste.

---

## 📝 Convenções do projeto (como o código é escrito)

### Padrão de formatação
- Aspas simples: `'texto'` (não `"texto"`)
- Largura máxima da linha: 100 caracteres
- Ponto e vírgula no final de cada linha: obrigatório

### Nomenclatura (como as coisas são nomeadas)
- **Arquivos:** tudo em letras minúsculas, palavras separadas por hífen: `country-service.ts`
- **Componentes:** PascalCase (primeira letra maiúscula): `LanguageSelect`
- **Serviços:** camelCase (primeira letra minúscula): `countryService`
- **Interfaces/Modelos:** PascalCase: `Country`, `RestCountryApiResponse`

### Onde colocar cada coisa
- Algo que **várias páginas usam** → `shared/`
- Algo que **conversa com a internet** → `core/services/`
- Algo que **é uma página** → `features/`
- Algo que **define formato de dados** → `core/models/`

---

## 🐛 Como resolver problemas comuns

### "ng is not recognized"
- Significa que o Angular CLI não está instalado
- Solução: `npm install -g @angular/cli`

### "Cannot find module '@angular/material/...'"
- As dependências não foram instaladas
- Solução: `npm install`

### A página fica em branco
- Abra o console do navegador (F12) e veja se há erros em vermelho
- Verifique se a API REST Countries está funcionando: [https://restcountries.com/v3.1/all](https://restcountries.com/v3.1/all)

### Os testes falham
- Rode `npm test` e veja qual teste falhou
- O próprio terminal mostra o que era esperado e o que aconteceu

---

## 📚 Glossário

| Termo | Explicação simples |
|---|---|
| **Angular** | Ferramenta que ajuda a criar sites organizados em "componentes" (pedaços reutilizáveis) |
| **API** | "Cardápio" de dados na internet. Você faz um pedido (requisição) e recebe os dados de volta |
| **Componente** | Um pedaço independente da tela (ex: botão, tabela, cabeçalho). Cada componente tem seu HTML, CSS e lógica |
| **CSS / SCSS** | Linguagem que define as cores, tamanhos e posições dos elementos na tela |
| **Debounce** | Técnica que espera o usuário parar de digitar antes de fazer algo (evita excesso de requisições) |
| **HTTP** | O protocolo que a internet usa para trocar informações (como o site conversa com a API) |
| **Interceptor** | Um "guarda" que vigia todas as requisições de internet e pode modificá-las ou bloquear |
| **JSON** | Formato de texto usado para trocar dados na internet (parece uma ficha com chave: valor) |
| **Lazy Loading** | "Carregamento preguiçoso" — o código de cada página só é baixado quando necessário |
| **LocalStorage** | Memória do navegador que guarda informações mesmo depois de fechar a aba |
| **Mapper** | Função que converte dados de um formato para outro (ex: formato da API → formato do app) |
| **Model** | "Ficha técnica" que descreve quais campos um dado tem (ex: um País tem nome, bandeira, população) |
| **Pipe** | Um "filtro" que transforma como um dado aparece na tela (ex: traduzir, formatar data, moeda) |
| **Responsivo** | Site que se adapta automaticamente a celular, tablet e computador |
| **Router** | Sistema de navegação — controla qual página aparece baseado na URL |
| **RxJS** | Biblioteca que ajuda a lidar com dados que chegam ao longo do tempo (como respostas da API) |
| **Service** | "Entregador" de dados — faz o trabalho pesado e entrega o resultado para os componentes |
| **Signal** | Variável especial que avisa automaticamente quando seu valor muda |
| **Toast** | Mensagem pequena que aparece no canto da tela e some sozinha (tipo notificação) |
| **TypeScript** | JavaScript com "superpoderes" — avisa sobre erros antes mesmo de abrir o site |

---

## 📞 Dúvidas?

Se algo não ficou claro, pergunte! Nenhuma pergunta é "boba". Todo mundo começa de algum lugar.

---

> **Última atualização:** Maio de 2026
> **Autor do projeto:** Lauro Otávio Urbano
> **Autor deste guia:** Documentação gerada para fins de aprendizado
