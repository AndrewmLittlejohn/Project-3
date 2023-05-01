import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AboutUs from "./components/AboutUs";
import CrawlLine from "./components/CrawlLine";
import Footer from "./components/Footer";
import Home from "./components/Home";
import IndyStock from "./components/IndyStock";
import InfoScroller from "./components/InfoScroller";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import UserPortfolio from "./components/UserPortfolio";
import UserProfile from "./components/UserProfile";
// import StockSearch from "./components/StockSearch";
import SymbolSearch from "./components/symbolSearch";


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="App">
      <div className="d-flex flex-column min-vh-100">
        <header>
          <Navbar />
          <CrawlLine />
        </header>
        <main className="container flex-grow-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
           
            <Route path="/stock" element={<IndyStock />} />
            <Route path="/info" element={<InfoScroller />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/portfolio" element={<UserPortfolio />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/search" element={<SymbolSearch />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
