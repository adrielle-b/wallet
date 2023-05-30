import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';
import App from '../../App';

describe('Testes da página Wallet', () => {
  const initialState = {
    user: { email: 'teste@teste.com' },
    wallet: {
      currencies: Object.keys(mockData).filter((moeda) => moeda !== 'USDT'),
      expenses: [{
        id: 0,
        value: '50',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Teste 1',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '10',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'Teste 2',
        exchangeRates: mockData,
      }],
      editor: false,
      idToEdit: 0,
    },
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Verifica os elementos do header', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    expect(screen.getByText(/teste@teste\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/285\.19/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
  });

  test('Verifica os elementos do form e adiciona despesa', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');

    screen.getByTestId('currency-input');
    screen.getByTestId('method-input');
    screen.getByTestId('tag-input');

    const btnSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(inputValue, '10.00');
    userEvent.type(inputDescription, 'Dez dólares');
    userEvent.click(btnSubmit);
  });

  test('Verifica se a tabela é renderizada com os botões de editar e excluir', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    screen.getAllByRole('button', { name: /editar/i });

    const btnExcluir = screen.getAllByRole('button', { name: /excluir/i });
    userEvent.click(btnExcluir[0]);
  });
});
