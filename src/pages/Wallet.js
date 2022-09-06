import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../Style/Wallet.scss';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-container">
        <Header />
        <WalletForm />
        <Table />
      </div>

    );
  }
}
export default Wallet;
