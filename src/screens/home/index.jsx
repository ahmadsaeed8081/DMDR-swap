import React from 'react';
import Hero from '../../components/Hero';
import Footer from '../../components/footer';
const Home = (props) => {
  return (
    <div className=''>
      <Hero USDTAllowance={props.USDTAllowance} USDTBalance={props.USDTBalance} EtherBalance={props.EtherBalance} perTokenInEth={props.perTokenInEth} perTokenInUSDT={props.perTokenInUSDT} />
      <Footer/>
     
    </div>
  );
};

export default Home;
