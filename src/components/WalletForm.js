import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencyList } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencyList());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            id="value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            id="description"
            data-testid="description-input"
          />
        </label>
        <select data-testid="currency-input">
          {currencies.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
  };
}

export default connect(mapStateToProps)(WalletForm);
