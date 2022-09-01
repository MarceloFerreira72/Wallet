import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login as loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  validateInputs = () => {
    const { email, password } = this.state;
    const NUMBER_SIX = 6;
    const atSymbol = email.indexOf('@');
    const dot = email.indexOf('.', atSymbol);
    const validateEmail = (
      atSymbol > 1 && dot >= atSymbol + 2 && dot !== email.length - 1
    );
    const validatePass = password.length >= NUMBER_SIX;
    return !(validateEmail && validatePass);
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(loginAction({ email }));
    history.push('/carteira');
  };

  render() {
    return (
      <form onSubmit={ this.handleLogin }>
        <input
          type="email"
          onChange={ (e) => this.setState({ email: e.target.value }) }
          data-testid="email-input"
        />
        <input
          type="password"
          onChange={ (e) => this.setState({ password: e.target.value }) }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ this.validateInputs() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
