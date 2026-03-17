# 🌍 GeoWorld

Explore informações detalhadas sobre todos os países do mundo. Filtre por moeda, idioma, busque por nome e veja detalhes como capital, população, fronteiras e muito mais.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-PT%20%7C%20EN-green?style=flat)

---

## Funcionalidades

- 🌍 Lista todos os países do mundo com bandeira, nome e código
- 🔍 Busca por nome (PT ou EN)
- 🏦 Filtro por moeda
- 🗣️ Filtro por idioma
- 📄 Página de detalhes com capital, região, população, moedas, idiomas, TLD e fronteiras clicáveis
- 🌐 Internacionalização completa (Português / Inglês)
- 💀 Skeleton loader durante o carregamento
- ➕ Botão "Mostrar mais" para carregamento progressivo
- 📱 Layout totalmente responsivo

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | React 19 + Vite 7 |
| Estilização | Tailwind CSS 4 + shadcn/ui |
| Roteamento | React Router DOM 7 |
| Internacionalização | i18next + react-i18next |
| Animações | GSAP 3 |
| API | [REST Countries](https://restcountries.com) (Fetch nativo) |
| Normalização CSS | normalize.css |
| Fontes | Inter (WOFF2, local) |

## Estrutura do projeto

```
src/
├── api/
│   └── countriesService.js   # Camada de chamadas à API REST Countries
├── components/
│   ├── Footer/               # Footer.jsx + Footer.css
│   ├── NotFound/             # NotFound.jsx + NotFound.css
│   ├── Preloader/            # Preloader.jsx + Preloader.css
│   └── ui/                   # Componentes shadcn/ui e customizados
├── context/
│   └── CountriesContext.jsx  # Context global com dados de todos os países
├── fonts/                    # Fontes Inter WOFF2 locais
├── pages/
│   ├── Details.jsx / .css    # Página de detalhes do país
│   ├── Home.jsx / .css       # Página principal com lista e filtros
│   └── Intro.jsx             # Página de introdução
├── utils/
│   ├── constants.js          # Constantes globais (API_URL, ITEMS_PER_LOAD…)
│   └── formatters.js         # Helpers puros (getCountryName)
├── App.jsx                   # Rotas + CountriesProvider
├── i18n.js                   # Configuração de internacionalização
└── index.css                 # Estilos globais + @font-face
```

## Como executar

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
git clone https://github.com/bluejono/countries-project.git
cd countries-project
npm install
cp .env.example .env
```

### Variáveis de ambiente

```env
VITE_API_URL=https://restcountries.com/v3.1
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173)

### Build de produção

```bash
npm run build
npm run preview
```

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Página de introdução |
| `/home` | Lista de países com busca e filtros |
| `/details/:id` | Detalhes completos de um país |

## Internacionalização

O idioma é detectado automaticamente pelo navegador. Para alternar manualmente, use o seletor na barra de navegação.

Idiomas suportados: **Português (PT-BR)** e **Inglês (EN)**

---

Dados fornecidos por [REST Countries API](https://restcountries.com)
