import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchange, saveEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  clearState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'select' ? target.option : target.value;
    this.setState({ [name]: value });
  };

  handleClickAdd = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(fetchExchange(expenses));
    this.clearState();

    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  atualizaEdit = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseEdit = expenses
      .find((expense) => Number(expense.id) === Number(idToEdit));
    // console.log('edit:', expenseEdit);

    const expense = {
      id: Number(idToEdit),
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expenseEdit.exchangeRates,
    };

    const listAtual = expenses
      .map((despesa) => (Number(despesa.id) === Number(idToEdit) ? expense : despesa));

    dispatch(saveEdit(listAtual));
    this.clearState();
    // console.log('listaEditada:', listAtual);

    this.setState(() => ({
      id: expenses[expenses.length - 1].id + 1,
    }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;

    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((moeda, index) => (
              <option key={ index } value={ moeda }>{moeda}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Forma de pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { editor ? (
          <button
            type="button"
            onClick={ this.atualizaEdit }
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.handleClickAdd }
          >
            Adicionar despesa
          </button>
        )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.number,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.shape({
        UDS: PropTypes.shape({
          code: PropTypes.string,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
