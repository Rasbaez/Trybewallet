import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserAction } from '../redux/actions/index';

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
    console.log(email);
    return (

      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          <input
            type="email"
            data-testid="email-input"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            value={ userPassword }
            type="password"
            name="userPassword"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
        // onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </form>
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
