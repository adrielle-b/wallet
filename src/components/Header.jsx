import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let totalConverted = 0;
    expenses.forEach((despesa) => {
      const { currency, value, exchangeRates } = despesa;
      const exchangeRate = exchangeRates[currency].ask;
      const convertedValue = value * exchangeRate;
      totalConverted += convertedValue;
    });
    const total = totalConverted.toFixed(2);
    return (
      <div>
        <h2 data-testid="email-field">{email}</h2>
        <p data-testid="total-field">{total}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
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
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
