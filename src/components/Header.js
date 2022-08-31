import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // console.log(this.props);
    console.log(expenses);

    const totalconverted = expenses.map((elem) => {
      let value = 0;
      value = Number(elem.value);
      let valueConverted = 0;
      const brCurrency = Object.values(elem.exchangeRates)
        .find((curr) => curr.code === elem.currency).ask;
      valueConverted += (value * Number(brCurrency));

      return Number(valueConverted.toFixed(2));
    });

    const totalDespenses = totalconverted.reduce((acc, curr) => acc + curr, 0);

    return (
      <header>
        <div className="notification is-primary" data-testid="email-field">
          {`Email: ${email}`}
          <p data-testid="total-field">
            {`${parseFloat(totalDespenses).toFixed(2)}`}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

export default connect(mapStateToProps)(Header);
