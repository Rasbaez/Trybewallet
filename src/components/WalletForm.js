import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { currencies } = this.props;

    return (
      <form className="has-background-grey-darker  flex-direction: row has-text-white">
        <div>
          <label htmlFor="valor">
            Valor:
            <input
              name="valor"
              data-testid="value-input"
              className="is-small "
              type="number"
            />
          </label>
        </div>

        <label htmlFor="moeda">
          Moeda:
          <div className="select">
            <select
              data-testid="currency-input"
              name="moeda"
            >
              {
                currencies.map((currency, index) => (
                  <option data-testid="currency-input" key={ index }>{currency}</option>
                ))
              }
            </select>
          </div>
        </label>

        <label htmlFor="tipoDespesa">
          Tipo:
          <div className="select">
            <select
              data-testid="tag-input"
              name="tipoDespesa"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </div>
        </label>

        <label htmlFor="tipoDespesa">
          Metodo:
          <div className="select">
            <select
              data-testid="method-input"
              name="tipoDespesa"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </div>
        </label>

        <label htmlFor="Description">
          <input
            data-testid="description-input"
            className="input"
            type="text"
            placeholder="descrição"
          />
        </label>
        <button
          type="submit"
          className="button is-info"
        >
          Adicionar Despesa
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
};

export default connect(mapStateToProps)(WalletForm);
