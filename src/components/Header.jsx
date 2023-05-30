import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './header.css';
import { FaUser } from 'react-icons/fa';
import { TbReportMoney } from 'react-icons/tb';

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
      <div className="header">

        <section className="logo">
          <h1 className="title-carteira">Wallet</h1>
          <div className="icon-carteira"><TbReportMoney /></div>
        </section>

        <section className="infos">
          <div className="user">
            <div className="icon-user"><FaUser /></div>
            <h2 data-testid="email-field">{email}</h2>
          </div>
          <div className="total">
            <p>Total:</p>
            <p data-testid="total-field">{total}</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </section>
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
