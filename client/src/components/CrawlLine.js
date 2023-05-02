import React, { useState, useEffect } from 'react';
import '../Globalstyles.css';

const CrawlLine = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const sector = 'economy_macro'; 
    const apiKey = '5JB6VTZK12BKB1D7'; 
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${sector}&apikey=${apiKey}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    if (jsonData.feed) {
      setData(jsonData.feed);
    } else {
      console.error('Error: jsonData.feed is undefined');
    }
    
  };

  useEffect(() => {
      fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="crawler">
      <div className='tidbits'>
      {data.map((item, index) => (
        <div className="tidbit" key={index}>
         <a href={item.url}><h6 className='tidbitDetail'>{item.title}</h6></a>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CrawlLine;
