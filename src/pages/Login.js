import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUserAction } from '../redux/actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userEmail: '',
      userPassword: '',
      isDisabled: true,
    };
  }

  handleEnableBtn = () => {
    const { userEmail, userPassword } = this.state;
    const passwordLength = 6;
    const validatePassword = userPassword.length >= passwordLength;
    const enableButton = userEmail.includes('@')
      && userEmail.toLowerCase().includes('.com') && validatePassword;

    this.setState({ isDisabled: !enableButton });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.handleEnableBtn(); });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { userEmail } = this.state;
    const { history, dispatch } = this.props;
    history.push('./carteira');
    dispatch(addUserAction(userEmail));
  };

  render() {
    const { isDisabled, userEmail, userPassword } = this.state;
    return (

      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          <input
            type="email"
            data-testid="email-input"
            value={ userEmail }
            name="userEmail"
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
