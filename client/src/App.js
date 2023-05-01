import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AboutUs from "./components/AboutUs";
import CrawlLine from "./components/CrawlLine";
import Footer from "./components/Footer";
import StockInfoPage from "./components/StockInfoPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import UserPortfolio from "./components/UserPortfolio";
import UserProfile from "./components/UserProfile";

import SymbolSearch from "./components/symbolSearch";
import { AuthProvider } from './utils/auth';

import "bulma/css/bulma.min.css";

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  return (
    <ApolloProvider client={client}>
    <AuthProvider value={{ loggedIn, email, setLoggedIn, setEmail }}>
          <Router>
    
        <div className="d-flex flex-column min-vh-100">
          <header>
            <Navbar />
            <CrawlLine />
          </header>
          <main className="container flex-grow-1">
            <Routes>
            <Route path="/search" element={<SymbolSearch />} />
            <Route path="/stock/:tickerSymbol" element={<StockInfoPage />} />

              {/* <Route path="/stock" element={<StockInfoPage />} /> */}
              {/* <Route path="/info" element={<InfoScroller />} /> */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/portfolio" element={<UserPortfolio />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/search" element={<SymbolSearch />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
           </Router>
   
        </AuthProvider>
        </ApolloProvider>
  );
}

export default App;
