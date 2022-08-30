import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const INITIAL_VALOR = 0;
    const defaultCurrency = 'BRL';
    const { userLogin } = this.props;
    return (
      <div>
        <p data-testid="email-field">{userLogin.email}</p>
        <p data-testid="total-field">{INITIAL_VALOR}</p>
        <p data-testid="header-currency-field">{defaultCurrency}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user,
});

Header.propTypes = {
  userLogin: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
