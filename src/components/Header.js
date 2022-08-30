import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // console.log(this.props);
    console.log(expenses);

    const totalconverted = expenses.map((expense) => {
      let value = 0;
      value = Number(expense.value);
      let valueConverted = 0;
      const brCurrency = Object.values(expense.exchangeRates)
        .find((curr) => curr.code === expense.currency).ask;
      valueConverted += (value * Number(brCurrency));

      return Number(valueConverted.toFixed(2));
    });

    const totalDespenses = totalconverted.reduce((acc, curr) => acc + curr, 0);
    // console.log(typeof totalDespenses);

    return (
      <header clasName="container">
        <p className="notification is-primary" data-testid="email-field">
          {`Email: ${email}`}
          <p data-testid="total-field">

            {`${expenses.length && totalDespenses.toString()}`}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </p>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
