import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en'],
    // Use local storage pattern for detector implicitly based on caches
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    resources: {
      pt: {
        translation: {
          nav: {
            intro: 'Intro',
            home: 'Início',
          },
          intro: {
            title: 'Olá, mundo!',
            body1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam pariatur ipsam reiciendis distinctio iste corporis voluptate, vel et dolor porro. Blanditiis quibusdam molestias magnam architecto similique, minus beatae explicabo praesentium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis, sed, perferendis illo repudiandae ad libero nulla cupiditate minima ipsum quod. Quas repellendus vel dolores sed mollitia commodi unde animi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime nemo eveniet dolorum nam modi dolor ab similique! Doloremque corrupti assumenda, officia fugit officiis totam nam unde quos, laboriosam culpa doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quidem eum, recusandae ullam magnam sit ad praesentium vitae ea quam earum adipisci iusto quos tenetur totam velit dolore saepe architecto?',
            button: 'Ir para o app',
          },
          home: {
            title: 'Países',
            subtitle: 'Aqui está a lista de todos os países do mundo!',
            search_placeholder: 'Buscar por nome do país...',
            filter_currency: 'Filtrar por moeda',
            all_currencies: 'Todas as moedas',
            filter_language: 'Filtrar por idioma',
            all_languages: 'Todos os idiomas',
            loading: 'Carregando países...',
            error_title: 'Ops! Algo deu errado.',
            not_found_title: 'Nada encontrado',
            not_found_desc: 'Nenhum país encontrado para "{{query}}".'
          },
          details: {
            title: 'Detalhes de',
            back: 'Voltar para Home',
            loading: 'Buscando informações do país...',
            error_msg: 'Não foi possível encontrar este país.',
            capital: 'Capital',
            region: 'Região',
            population: 'População',
            languages: 'Idiomas',
            currencies: 'Moedas',
            tld: 'Domínio de Topo (TLD)',
            tld_tooltip: 'O sufixo da internet oficial do país (ex: .br para Brasil).',
            maps: 'Ver no Google Maps',
            subregion: 'Sub-região',
            no_data: 'N/A',
            borders: 'Fronteiras'
          },
          footer: {
            rights: 'Todos os direitos reservados.',
            api_source: 'Dados: Rest Countries API'
          }
        }
      },
      en: {
        translation: {
          nav: {
            intro: 'Intro',
            home: 'Home',
          },
          intro: {
            title: 'Hello, world!',
            body1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam pariatur ipsam reiciendis distinctio iste corporis voluptate, vel et dolor porro. Blanditiis quibusdam molestias magnam architecto similique, minus beatae explicabo praesentium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae debitis, sed, perferendis illo repudiandae ad libero nulla cupiditate minima ipsum quod. Quas repellendus vel dolores sed mollitia commodi unde animi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime nemo eveniet dolorum nam modi dolor ab similique! Doloremque corrupti assumenda, officia fugit officiis totam nam unde quos, laboriosam culpa doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, quidem eum, recusandae ullam magnam sit ad praesentium vitae ea quam earum adipisci iusto quos tenetur totam velit dolore saepe architecto?',
            button: 'Go to the app',
          },
          home: {
            title: 'Countries',
            subtitle: 'Here is the list of all the countries in the world!',
            search_placeholder: 'Search by country name...',
            filter_currency: 'Filter by currency',
            all_currencies: 'All currencies',
            filter_language: 'Filter by language',
            all_languages: 'All languages',
            loading: 'Loading countries...',
            error_title: 'Whoops! Something went wrong.',
            not_found_title: 'Nothing found',
            not_found_desc: 'No countries found for "{{query}}".'
          },
          details: {
            title: 'Details of',
            back: 'Back to Home',
            loading: 'Fetching country information...',
            error_msg: 'Could not find this country.',
            capital: 'Capital',
            region: 'Region',
            population: 'Population',
            languages: 'Languages',
            currencies: 'Currencies',
            tld: 'Top Level Domain (TLD)',
            tld_tooltip: 'The official internet country code top-level domain (e.g. .us for United States).',
            maps: 'View on Google Maps',
            subregion: 'Subregion',
            no_data: 'N/A',
            borders: 'Border Countries'
          },
          footer: {
            rights: 'All rights reserved.',
            api_source: 'Data: Rest Countries API'
          }
        }
      }
    }
  });

export default i18n;
