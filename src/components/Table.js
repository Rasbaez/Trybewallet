import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, expenseToEdit } from '../redux/actions/index';

class Table extends Component {
  handleDeleteExpense = ({ target }) => {
    const { id } = target;
    const { expenses, dispatch } = this.props;

    const filtredExpenses = expenses.filter((expense) => expense.id !== Number(id));
    dispatch(deleteExpense(filtredExpenses));
  };

  handleEditExpense = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;

    dispatch(expenseToEdit(Number(id)));
  };

  render() {
    const { expenses } = this.props;

    const numberToFixed = (strNum) => parseFloat(strNum).toFixed(2);
    const converter = (value, tax) => numberToFixed(value) * tax;

    const rowTableWithData = expenses.map(
      ({ id, description, tag, method, value, currency, exchangeRates }) => (

        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{numberToFixed(value)}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{numberToFixed(exchangeRates[currency].ask)}</td>
          <td>{converter(value, exchangeRates[currency].ask)}</td>
          <td>Real</td>
          <td>
            <button
              type="button"
              data-testid="edit-btn"
              id={ id }
              onClick={ this.handleEditExpense }
            >
              Editar
            </button>
            <button
              id={ id }
              type="button"
              data-testid="delete-btn"
              onClick={ this.handleDeleteExpense }
            >
              Excluir
            </button>
          </td>
        </tr>
      ),
    );

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
            {rowTableWithData}
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,

});

export default connect(mapStateToProps)(Table);
