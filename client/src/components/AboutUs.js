import React from 'react';
import { Link } from 'react-router-dom';
import '../Globalstyles.css';


function AboutUs (){

  return(
<div className="card">
  <div className="card-content">
    <div className="content">

      <h3>Board of Directors</h3>
      <h4><a href="https://www.investopedia.com/terms/b/bernard-madoff.asp" target="_blank" rel="noopener noreferrer">Bernard Madoff</a></h4>
       <h4><a href="https://www.forbes.com/profile/sam-bankman-fried/" target="_blank" rel="noopener noreferrer">Sam Bankman-Fried</a></h4>
      <h4><a href="https://en.wikipedia.org/wiki/Jordan_Belfort" target="_blank" rel="noopener noreferrer">Jordan Belfort</a></h4>
      <h4><a href="https://en.wikipedia.org/wiki/Charles_Ponzi" target="_blank" rel="noopener noreferrer">Charles Ponzi</a></h4>

      <p><Link to="/nope">Accounting and Financial Attestations provided by Arthur Andersen</Link></p>
      
    </div>
  </div>
</div>


  );
}

export default AboutUs;