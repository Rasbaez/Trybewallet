import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Style/Header.scss';
import icon from '../Style/image/icon.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const totalconverted = expenses.map((elem) => {
      let value = 0;
      value = Number(elem.value);
      let valueConverted = 0;
      const brCurrency = Object.values(elem.exchangeRates)
        .find((curr) => curr.code === elem.currency).ask;
      valueConverted += (value * Number(brCurrency));

      return Number(valueConverted.toFixed(2));
    });

    const totalOfExpenses = totalconverted.reduce((acc, curr) => acc + curr, 0);

    return (
      <header>

        <div
          className="user-data notification is-primary
          is-flex is-justify-content-space-around"
          data-testid="email-field"
        >
          <img src={ icon } alt="icone de carteira" />
          {`Email: ${email}`}
          <p data-testid="total-field">
            {`Total das despesas: ${parseFloat(totalOfExpenses).toFixed(2)}  BRL`}
          </p>
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
