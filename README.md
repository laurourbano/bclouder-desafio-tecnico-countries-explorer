# Explorador de Países

Aplicação web desenvolvida em **Angular** para explorar informações sobre países utilizando a API pública REST Countries.

Esta aplicação foi implementada para servir como base de avaliação em um desafio técnico da empresa bclouder.

O sistema permite pesquisar países, filtrar por região e visualizar detalhes completos de cada país.

---

# Funcionalidades

* Busca de países por nome
* Filtro por região
* Ordenação de colunas
* Paginação de resultados
* Layout responsivo (desktop e mobile)
* Página de detalhes do país
* Exibição de países de fronteira
* Navegação entre países

---

# Tecnologias Utilizadas

* Angular
* TypeScript
* Angular Material
* RxJS
* REST Countries API
* Ngx-Toastr

---

# API Utilizada

A aplicação consome dados da API pública:

* https://restcountries.com/v3.1

Exemplo de endpoint utilizado:

* https://restcountries.com/v3.1/all

A API fornece informações como:

* nome
* bandeira
* capital
* população
* região
* idiomas
* moedas
* países fronteiriços

---

# Instalação do Projeto

Clone o repositório:

git clone https://github.com/laurourbano/bclouder-desafio-tecnico-countries-explorer

Acesse a pasta do projeto:

cd country-explorer

Instale as dependências:

`npm install`

---

# Executar o Projeto

Inicie o servidor de desenvolvimento:

`ng serve -o`

A aplicação ficará disponível em:

http://localhost:4200

---

# Build para Produção

Para gerar o build de produção:

ng build --configuration production

Os arquivos serão gerados na pasta:

dist/

---

Estrutura do Projeto

```
src
│
├── app
│   │
│   ├── core
│   │   ├── models
│   │   │   └── country.model.ts
│   │   │
│   │   └── services
│   │       └── country.service.ts
│   │
│   ├── features
│   │   ├── home
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.scss
│   │   │
│   │   └── detail
│   │       ├── detail.component.ts
│   │       ├── detail.component.html
│   │       └── detail.component.scss
│   │
│   └── shared
│       └── material
│           └── material.module.ts
│
└── environments
```

---

Responsividade

  - A interface foi adaptada para diferentes tamanhos de tela.

Desktop:

 - Tabela completa com todas as colunas.

Mobile:

 - Colunas reduzidas.

 - Navegação por toque na linha.

Principais Recursos

- Busca de País

- Permite localizar países digitando o nome.

- Filtro por Região

- Filtra países por regiões como:
```
Africa

Americas

Asia

Europe

Oceania
```

- Página de Detalhes

- Exibe informações completas como:
```
nome oficial

capital

população

área

idiomas

moedas

países na fronteira
```

---

🚀 Deploy

A aplicação foi publicada na Vercel.

### * https://bclouder-desafio-tecnico-countries.vercel.app/


📄 Licença

  ### Este projeto foi desenvolvido, com muito carinho, para fins educacionais e de avaliação técnica da empresa bclouder. Quero realmente, que essa vaga seja minha.

#### Lauro Otávio Urbano
#### https://www.linkedin.com/in/laurourbano
#### https://github.com/laurourbano
#### +55(41)9 9808-6077 celular/whatsapp
