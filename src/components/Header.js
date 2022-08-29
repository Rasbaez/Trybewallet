import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;

    // console.log(user);
    console.log(this.props);
    return (
      <header clasName="container">
        <p className="notification is-primary" data-testid="email-field">
          {`Email: ${email}`}
          <p data-testid="total-field">{`Despesas: ${0}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </p>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // expense: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(Header);
