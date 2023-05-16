import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { excluirExpense, habilitaEdit } from '../redux/actions';

class Table extends Component {
  handleClickExcluir = ({ target }) => {
    const { id } = target;
    const { expenses, dispatch } = this.props;
    const listAtual = expenses.filter((expense) => Number(expense.id) !== Number(id));
    dispatch(excluirExpense(listAtual));
  };

  handleClickEditar = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch(habilitaEdit(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
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
          {expenses.map((expense) => {
            const { id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates } = expense;

            const exchangeRate = exchangeRates[currency];

            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRate.name}</td>
                <td>{Number(exchangeRate.ask).toFixed(2)}</td>
                <td>{(Number(value) * Number(exchangeRate.ask)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    id={ id }
                    onClick={ (event) => this.handleClickEditar(event) }
                  >
                    Editar

                  </button>
                  <button
                    data-testid="delete-btn"
                    id={ id }
                    onClick={ (event) => this.handleClickExcluir(event) }
                    type="button"
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
