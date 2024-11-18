import React, { useEffect, useState } from "react";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";
import axios from "axios";

function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("candy"); //this will fetch the candy gifs to the main page as it loads
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //useEffect takes in two parameters
    setLoading(true);
    let activeFetch = true; //whenever the query state changes the local var activeFetch sets it to true then we fetch the data
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=75HgwE7BRhj8qsJr16LqiO4oziA8WsdZ&limit=24&rating=g&q=${query}`
      ) //performs the request
      .then((response) => {
        //this function get executed once the get request is fulfilled
        // handle success
        if (activeFetch) {
          setGifs(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        //catch will handle any errors
        // handle error
        console.log("Error fetching and parsing data", error);
      });
    return () => {
      activeFetch = false; //when the query changes again, the previous local activeFetch variable is set to false and a new local active variable is declared
    };
    /*FETCHING DATA WITH REACT
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=75HgwE7BRhj8qsJr16LqiO4oziA8WsdZ&limit=24&rating=g")
    .then(response => response.json())
    .then(responseData => setGifs(responseData.data))
    .catch(error => console.log("Error fetching and parsing data", error));*/
  }, [query]);

  const handleQueryChange = (searchText) => {
    setQuery(searchText);
  };

  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm changeQuery={handleQueryChange} />
        </div>
      </div>
      <div className="main-content">
        {loading ? <p>Loading...</p> : <GifList data={gifs} />}
      </div>
    </div>
  );
}

export default App;
