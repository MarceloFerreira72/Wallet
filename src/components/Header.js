import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  conversor = ({ currency, exchangeRates, value }) => {
    const currencyInfo = Object
      .entries(exchangeRates).find((element) => element[0] === currency);
    return value * currencyInfo[1].ask;
  };

  render() {
    const initialValue = '0.00';
    const defaultCurrency = 'BRL';
    const { userLogin, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{userLogin.email}</p>
        {
          expenses.length > 0 ? (
            <p data-testid="total-field">
              {parseFloat(expenses.reduce((acc, curr) => acc + this.conversor(curr), 0))
                .toFixed(2)}
            </p>
          )
            : (
              <p data-testid="total-field">
                {initialValue}
              </p>
            )
        }
        <p data-testid="header-currency-field">{defaultCurrency}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userLogin: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
