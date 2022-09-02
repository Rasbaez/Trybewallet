import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, addExpense, editExpenseAction } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleResetState = () => {
    const { id } = this.state;
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, editor, idToEdit } = this.props;
    const currencies = await dispatch(fetchAPI());
    delete currencies.USDT;

    switch (editor) {
    case false:
      this.setState({ exchangeRates: { ...currencies } });
      dispatch(addExpense(this.state));
      break;

    case true:
      this.setState({ id: idToEdit }, () => {
        dispatch(editExpenseAction(this.state));
      });
      break;
    default: return null;
    }
    this.handleResetState();
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const currenciesOption = currencies.map((curr, index) => (
      <option key={ index }>{curr}</option>
    ));

    return (
      <form
        className="has-background-grey-darker has-text-white"
        onSubmit={ this.handleSubmit }
      >

        <label htmlFor="value">
          Valor:
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            data-testid="value-input"
            className="is-small "
            type="number"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <div className="select">
            <select
              onChange={ this.handleChange }
              value={ currency }
              data-testid="currency-input"
              name="currency"
            >
              {currenciesOption}
            </select>
          </div>
        </label>

        <label htmlFor="tag">
          Tipo:
          <div className="select">
            <select
              onChange={ this.handleChange }
              value={ tag }
              data-testid="tag-input"
              name="tag"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </div>
        </label>

        <label htmlFor="method">
          Metodo:
          <div className="select">
            <select
              onChange={ this.handleChange }
              value={ method }
              data-testid="method-input"
              name="method"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            onChange={ this.handleChange }
            value={ description }
            data-testid="description-input"
            className="input"
            type="text"
            placeholder="descrição"
            name="description"
          />
        </label>
        <button
          type="submit"
          className="button is-info"
        >
          {!editor ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
