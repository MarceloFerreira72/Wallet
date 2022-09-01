import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const correctData = Object.keys(mockData).filter((element) => element !== 'USDT');

describe('testa a página da carteira', () => {
  beforeEach(renderWithRouterAndRedux(
    <App />,
    {
      initialState: {
        user: { email: 'marcelo@email.com' },
        wallet: {
          currencies: correctData,
          expenses: [],
        },
      },
      initialEntries: ['/carteira'],
    }
    ,
  ));
  it('');
});
