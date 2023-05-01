import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_STOCK_TO_FAVORITES } from '../utils/mutations';
import AuthContext from '../utils/auth';
import '../Globalstyles.css';
import { USER_INFO } from '../utils/queries';

import SymbolSearch from './symbolSearch';


const CompanyInfoTable = ({tickerSymbol, user}) => {
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      const apiKey = '5JB6VTZK12BKB1D7';
      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerSymbol}&apikey=${apiKey}`);
      const info = await response.json();
      // const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=5JB6VTZK12BKB1D7`);
      // const info = await response.json();

      setCompanyInfo(info);
    };
    fetchCompanyInfo();
  }, [tickerSymbol]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }} className="card">
  <div className="card-content">
    <div className="content">
      <h3>Company Overview</h3>
      <p>{companyInfo.Description}</p>
    </div>
  </div>
</div>
    <table className="table">
      <thead>
        <tr>
          <th>Exchange</th>
          <th>Company</th>
          <th>Sector</th>
          <th>Industry</th>
          <th>Dividend/Share</th>
          <th>EPS</th>
          <th>52 Week High</th>
          <th>52 Week Low</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{companyInfo.Exchange}</td>
          {/* <td><a href="#" onClick={(e) => {e.preventDefault(); handleAddStock(); }}>{companyInfo.Name}</a></td> */}
          <td>{companyInfo.Name}</td>
          <td>{companyInfo.Sector}</td>
          <td>{companyInfo.Industry}</td>
          <td>{companyInfo.DividendPerShare}</td>
          <td>{companyInfo.EPS}</td>
          <td>{companyInfo['52WeekHigh']}</td>
          <td>{companyInfo['52WeekLow']}</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

const CompanyInfoPage = () => {
  const { tickerSymbol } = useParams();
  const { user } = useContext(AuthContext);
  const email = localStorage.getItem('email');
  console.log('User object:', email);


  const [addStockToFavorites] = useMutation(ADD_STOCK_TO_FAVORITES);

  // const { loading, error, data } = useQuery(USER_INFO, {
  //   variables: { email },
  //   skip: !email, // Skip the query if userId is not available
  // });

  // useEffect(() => {
  //   if (!loading && !error && data) {
  //     console.log('User email:', data.user.email);
  //   }
  // }, [loading, error, data]);
  
  // const handleAddStock = async () => {
  //   try {
  //     const { data } = await addStockToFavorites({
  //       variables: { userId, stockSymbol: tickerSymbol,
        
  //       },
  //     });
  //     console.log('Stock added to favorites:', data.addStockToFavorites);
  //   } catch (error) {
  //     console.error('Error adding stock to favorites:', error);
  //   }
  // };

  const handleAddStock = async () => {
    console.log('handleAddStock called'); // Log when the function is called
    console.log('userId:', email); 
    console.log('tickerSymbol:', tickerSymbol);
  
    try {
      console.log('Attempting to add stock to favorites...');
      const { data } = await addStockToFavorites({
        variables: {
          email,
          stockSymbol: tickerSymbol,
        },
      });
  
      console.log('Stock added to favorites:', data.addStockToFavorites);
    } catch (error) {
      console.error('Error message:', error.message);
      console.error('Error stack trace:', error.stack);
    }
  };
  
  
  return (
    <div>
      <CompanyInfoTable tickerSymbol={tickerSymbol} handleAddStock={handleAddStock} user={user}/>
      <button className="button is-primary" onClick={(e) => {e.preventDefault(); handleAddStock(); }}>Add to Favorites</button>

      <div style={{ marginTop: '50px', marginBottom: '30px' }}>
        <SymbolSearch />
      </div>
    </div>
  );
};

export default CompanyInfoPage;
