import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    const numberToFixed = (strNum) => parseFloat(strNum).toFixed(2);

    const converter = (value, tax) => {
      const convertedValue = value === '' ? value = '0' : numberToFixed(value) * tax;
      return convertedValue;
    };

    const rowTableWithData = expenses.map((expense) => (

      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{numberToFixed(expense.value)}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{numberToFixed(expense.exchangeRates[expense.currency].ask)}</td>
        <td>{converter(expense.value, expense.exchangeRates[expense.currency].ask)}</td>
        <td>Real</td>
        <td>
          <button type="button">Excluir</button>
          <button type="button">Editar</button>
        </td>
      </tr>

    ));

    return (
      <div className="table-container">
        <table
          className="table table is-striped is-hoverable is-bordered is-narrow "
        >

          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {expenses && rowTableWithData}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
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
  ...state.wallet,
});

export default connect(mapStateToProps)(Table);
