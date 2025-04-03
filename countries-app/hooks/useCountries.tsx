import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
interface CountryFilterInput {
  code?: { eq: string };
}
interface Country {
  code: string;
  name: string;
  continent: { name: string };
  currency: string;
  languages: { name: string }[];
  capital: string;
}
interface GetCountriesResponse {
  countries: Country[];
}

export const useCountries = (filter?: CountryFilterInput) => {
  const { loading, error, data } = useQuery<GetCountriesResponse>(GET_COUNTRIES, {
    variables: filter ? { filter } : undefined,
    skip: !filter,
  });

  return { loading, error, data: data?.countries ?? [] };
};
