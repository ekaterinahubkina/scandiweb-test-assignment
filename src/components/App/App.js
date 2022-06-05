import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getProducts } from "../../utils/GraphqlApi";
import { Route, Routes } from "react-router-dom";
import ProductListingPage from "../ProductListingPage/ProductListingPage";
import Header from "../Header/Header";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), products: [], categories: [] };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    client
      .query({ query: getProducts })
      .then((data) => {
        console.log(data)
        this.setState(() => {
          return { products: data, categories: data.data.categories };
        });
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="page">
          <Header categories={this.state.categories} />
          <Routes>
            <Route path="/" element={<ProductListingPage />}></Route>
          </Routes>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
