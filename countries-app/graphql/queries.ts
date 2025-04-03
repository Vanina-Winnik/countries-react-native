import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
  query GetCountry($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      continent {
        name
      }
      currency
      languages {
        name
      }
      capital
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      continent { name }
      currency
      languages { name }
      capital
    }
  }
`;
