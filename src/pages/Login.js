import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserAction } from '../redux/actions/index';
import '../Style/Login.scss';
import logo from '../Style/image/logo.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      userPassword: '',
      isDisabled: true,
    };
  }

  handleEnableBtn = () => {
    const { email, userPassword } = this.state;
    const passwordLength = 6;
    const validatePassword = userPassword.length >= passwordLength;
    const enableButton = email.includes('@')
      && email.toLowerCase().includes('.com') && validatePassword;

    this.setState({ isDisabled: !enableButton });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.handleEnableBtn(); });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;
    history.push('./carteira');
    dispatch(addUserAction(email));
  };

  render() {
    const { isDisabled, email, userPassword } = this.state;

    return (
      <div className="logo-wallet">
        <img src={ logo } alt="imagem da trybe wallet" />
        <form className="login-container" onSubmit={ this.handleSubmit }>
          <div
            className="control has-icons-left has-icons-right"
            style={ { padding: '23px' } }
          >
            <label className="label" htmlFor="email">
              Email
              <input
                className="input is-small is-rounded"
                placeholder="Email"
                type="email"
                data-testid="email-input"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />

            </label>
            <label className="label" htmlFor="password">
              Password
              <input
                className="input is-small is-rounded"
                value={ userPassword }
                type="password"
                name="userPassword"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              className={
                isDisabled ? 'button is-danger is-small' : 'button is-primary is-small'
              }
              type="submit"
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
