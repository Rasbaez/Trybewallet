import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <Header />
        <div>Wallet</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.userReducer,
});

export default connect(mapStateToProps)(Wallet);
