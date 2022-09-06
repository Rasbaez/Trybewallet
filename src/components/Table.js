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
    const { expenses, editor } = this.props;

    const isDanger = 'button is-danger is-small';
    const isPrimary = 'button is-primary is-small';
    const isWarning = 'button is-warning is-small';

    const numberToFixed = (strNum) => parseFloat(strNum).toFixed(2);
    const converter = (value, tax) => (numberToFixed(value) * tax).toFixed(2);

    return (

      <table
        className="table is-striped is-hoverable is-bordered is-narrow "
        style={ { width: '100%' } }
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
          {
            expenses.map(
              (
                { id, description, tag, method, value, currency, exchangeRates },
                index,
              ) => (

                <tr key={ index }>
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
                      className={
                        !editor ? isPrimary
                          : isWarning
                      }
                      type="button"
                      data-testid="edit-btn"
                      id={ id }
                      onClick={ this.handleEditExpense }

                    >
                      Editar
                    </button>
                    <button
                      className={ isDanger }
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
            )
          }
        </tbody>
      </table>
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
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.wallet,

});

export default connect(mapStateToProps)(Table);
