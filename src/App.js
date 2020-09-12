import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import Recipe from "./components/Recipe";
import { v4 as uuidv4 } from "uuid";
import Alert from "./components/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "517c6312";
  const APP_Key = "80b515fe68530b96126d920190821c21";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_Key}`;
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (result.data.more == false) {
        return setAlert("No food with such name");
      }
      setRecipes(result.data.hits);
      console.log(result);
      setAlert("");
      setQuery("");
    } else {
      setAlert("Please fill the form");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="App">
      <h1>Food Recipe App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe recipe={recipe} key={uuidv4()} />)}
      </div>
    </div>
  );
}

export default App;
