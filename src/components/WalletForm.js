import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencyList, saveExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expensesState: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencyList());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { expenses, dispatch } = this.props;
    const id = expenses.length;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(saveExpense({ ...expense }));
    this.setState((state) => ({
      expensesState: [...state.expensesState, expense],
    }), this.setState({ value: '', description: '' }));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor
          <input
            onChange={ this.handleChange }
            name="value"
            type="number"
            id="value"
            data-testid="value-input"
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            onChange={ this.handleChange }
            name="description"
            type="text"
            id="description"
            data-testid="description-input"
            value={ description }
          />
        </label>
        <select
          onChange={ this.handleChange }
          name="currency"
          data-testid="currency-input"
        >
          {currencies.map((element) => (
            <option key={ element } value={ element }>{element}</option>
          ))}
        </select>
        <select
          onChange={ this.handleChange }
          name="method"
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          onChange={ this.handleChange }
          name="tag"
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="submit">Adicionar Despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(WalletForm);
