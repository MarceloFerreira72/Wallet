import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';

describe('testa se os elementos estão corretamente na tela', () => {
  let renderReturn = '';
  beforeEach(() => {
    renderReturn = renderWithRouterAndRedux(<App />);
    expect(renderReturn.history.location.pathname).toMatch('/');
  });
  it('verifica os campos de email e senha', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput.value).toMatch('');
    expect(passwordInput.value).toMatch('');
  });
  it('Renderiza botão de enviar', () => {
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBeTruthy();
  });
  it('Verifica validação dos inputs e habilitação do botão', () => {
    const mockedValidEmail = 'teste@teste.com';
    const mockedUnvalidEmail = 'teste.teste';
    const mockedValidPassword = '123456';
    const mockedUnvalidPassword = 'abcde';
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput.value).toMatch('');
    expect(passwordInput.value).toMatch('');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBeTruthy();

    userEvent.type(emailInput, mockedUnvalidEmail);
    expect(submitButton.disabled).toBeTruthy();
    userEvent.type(passwordInput, mockedUnvalidPassword);
    expect(submitButton.disabled).toBeTruthy();

    userEvent.type(emailInput, mockedValidEmail);
    expect(submitButton.disabled).toBeTruthy();
    userEvent.type(passwordInput, mockedValidPassword);
    expect(submitButton.disabled).toBeFalsy();
  });
  it('Verifica alteração da rota após preenchimentos de input e click no botão', () => {
    const mockedValidEmail = 'teste@teste.com';
    const mockedValidPassword = '123456';
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(emailInput, mockedValidEmail);
    userEvent.type(passwordInput, mockedValidPassword);
    userEvent.click(submitButton);
    expect(renderReturn.history.location.pathname).toMatch('/carteira');
  });
});
