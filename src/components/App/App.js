import "./App.css";
import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getProducts } from "../../utils/GraphqlApi";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import All from "../All/All";
// import CartOverlay from "../Header/CartOverlay/CartOverlay";
import Clothes from "../Clothes/Clothes";
import Tech from "../Tech/Tech";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], categories: [], currencies: [], };
  }

  componentDidMount() {
    client
      .query({ query: getProducts })
      .then((data) => {
        console.log(data);
        this.setState(() => {
          return {
            products: data,
            categories: data.data.categories,
            currencies: data.data.currencies,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="page">
          {this.state.currencies.length > 0 && (
            <>
              <Header
                categories={this.state.categories}
                currencies={this.state.currencies}
              />
              
              <Routes>
                <Route path="/" element={<Navigate to='/all' replace={true} />}></Route>
                <Route path="/all" index element={<All />}></Route>
                <Route path="/tech" element={<Tech />}></Route>
                <Route path="/clothes" element={<Clothes />}></Route>
              </Routes>
            </>
          )}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
