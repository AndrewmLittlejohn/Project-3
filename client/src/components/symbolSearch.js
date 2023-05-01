import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import "bulma/css/bulma.css"
import { useNavigate } from "react-router-dom";
import "../styles/GlobalStyles.css"

// Replace this key with your own Alpha Vantage API key
const ALPHA_VANTAGE_API_KEY = "5JB6VTZK12BKB1D7";

function SymbolSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef()

  // Load the previously selected stock symbol from localStorage (if available)
  // and set up the timeout cleanup
  // useEffect(() => {
  //   const savedSymbol = localStorage.getItem("selectedSymbol")
  //   if (savedSymbol) {
  //     handleResultClick(JSON.parse(savedSymbol))
  //   }

  //   return () => {
  //     if (searchTimeout) {
  //       clearTimeout(searchTimeout)
  //     }
  //   }
  // }, [searchTimeout])

  // Handle input changes, setting the search term, and managing the search timeout
  const handleInputChange = (event) => {
    const query = event.target.value
    setSearchTerm(query)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    if (query.length > 0) {
      setSearchTimeout(
        setTimeout(() => {
          searchSymbols(query)
        }, 300)
      )
    } else {
      setSearchResults([])
    }
  }

  // Search for stock symbols using the Alpha Vantage API
  const searchSymbols = async (query) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "SYMBOL_SEARCH",
          keywords: query,
          apikey: ALPHA_VANTAGE_API_KEY,
        },
      })

      if (response.data.bestMatches) {
        setSearchResults(
          response.data.bestMatches.map((match) => ({
            symbol: match["1. symbol"],
            name: match["2. name"],
          }))
        )
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error("Error fetching stock symbols:", error)
      setError("Error fetching stock symbols. Please try again later.")
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle click events on search results and save the selected symbol to localStorage
  // const handleResultClick = (result) => {
  //   localStorage.setItem("selectedSymbol", JSON.stringify(result))
  //   // Perform any additional actions here when a result is clicked
  // }
  const navigate = useNavigate();

  const handleResultClick = (result) => {
    localStorage.setItem("selectedSymbol", result.symbol); // <-- Store only the stock symbol
    const selectedSymbol = localStorage.getItem("selectedSymbol");
    navigate(`/stock/${selectedSymbol}`);
    setSearchTerm("");
    localStorage.removeItem("selectedSymbol");
  };
  

  return (
    <div className="App search-container">
      <div className="field">
        <div className={`control ${isLoading ? "is-loading" : ""}`}>
          <input
            className="input"
            type="text"
            ref={inputRef}
            placeholder="Search stock symbol"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {error && <div className="notification is-danger">{error}</div>}
      <div className="panel">
        {searchResults.map((result) => (
          <a
            className="panel-block"
            key={result.symbol}
            onClick={() => handleResultClick(result)}
          >
            {result.symbol} - {result.name}
          </a>
        ))}
      </div>
      <button className="button is-primary" onClick={handleResultClick} disabled={!localStorage.getItem("selectedSymbol")}>Search</button>
    </div>
  );
}
export default SymbolSearch;









