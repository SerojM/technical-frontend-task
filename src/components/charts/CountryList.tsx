import styled from '@emotion/styled';
import { ReactElement } from 'react';
import CountryItem from './CountryItem';
import { covidCountry as Country } from '../../store/models/ICovid';

interface Props {
  countries: Country[];
  onItemClick: (country: Country) => void;
}

const ListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

function CountryList({ countries, onItemClick }: Props): ReactElement {
  return (
    <ListWrapper>
      {countries.map((country): ReactElement | undefined => {
        if (country?.NewConfirmed > 0) {
          return (
            <CountryItem key={country.ID} country={country} onItemClick={onItemClick} />
          );
        }
      })}
    </ListWrapper>
  );
}

export default CountryList;
