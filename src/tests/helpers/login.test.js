import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Testes da página Login', () => {
  test('Verifica se existe 2 input e um button na tela', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('textbox', { name: /email:/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/senha:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('Verifica se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).toBeDisabled();
  });

  test('Verifica se o botão habilita quando as informações são validadas e o click muda de rota', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputSenha, '123456');
    userEvent.click(btnEntrar);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  test('Verifica se o email foi salvo no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputSenha, '123456');
    userEvent.click(btnEntrar);

    expect(store.getState().user.email).toBe('email@email.com');
  });
});
