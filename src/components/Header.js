import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const defaultCurrency = 'BRL';
    const { userLogin, expenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{userLogin.email}</p>
        <p data-testid="total-field">
          {
            parseFloat(
              expenses
                .reduce((acc, { value, conversion }) => acc + (value * conversion), 0)
                .toFixed(2),
            )
          }
        </p>
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
