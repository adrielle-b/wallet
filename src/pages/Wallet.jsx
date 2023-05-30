import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../components/walletForm.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <section className="conteudo">
          <WalletForm />
          <Table />
        </section>
      </div>
    );
  }
}

export default Wallet;
