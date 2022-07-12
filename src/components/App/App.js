import "./App.css";
import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getProduct, getProducts } from "../../utils/GraphqlApi";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header/Header";
// import CartOverlay from "../Header/CartOverlay/CartOverlay";
import ProductListingPage from "../ProductListingPage/ProductListingPage";
import HOCProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      selectedCurrency: "$",
      selectedProduct: {},
    };
  }

  componentDidMount() {
    client
      .query({ query: getProducts })
      .then((data) => {
        console.log(data);
        this.setState(() => {
          return {
            categories: data.data.categories,
            currencies: data.data.currencies,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  selectCurrency = (currency) => {
    this.setState({ selectedCurrency: currency });
  };

  // chooseCurrency = () => {
  //   return this.props.product.prices.find(
  //     (item) => item.currency.symbol === this.props.currency
  //   );
  // };

  getProduct = (id) => {
    client
      .query({ query: getProduct(id) })
      .then((data) => {
        console.log("got product by id");

        console.log(data);
        this.setState({ selectedProduct: data });
      })
      .catch((err) => console.log(err));
  };
  handleProductCardClick = (card) => {
    this.setState({ selectedProduct: { ...card } });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="page">
          {this.state.currencies.length > 0 && (
            <>
              <Header
                categories={this.state.categories}
                currencies={this.state.currencies}
                selectCurrency={this.selectCurrency}
              />

              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/all" replace={true} />}
                ></Route>
                <Route
                  path="/all"
                  element={
                    <ProductListingPage
                      category={this.state.categories.find(
                        (item) => item.name === "all"
                      )}
                      currency={this.state.selectedCurrency}
                      onCardClick={this.handleProductCardClick}
                    />
                  }
                ></Route>
                <Route
                  path="/tech"
                  element={
                    <ProductListingPage
                      category={this.state.categories.find(
                        (item) => item.name === "tech"
                      )}
                      currency={this.state.selectedCurrency}
                      onCardClick={this.handleProductCardClick}
                    />
                  }
                ></Route>
                <Route
                  path="/clothes"
                  element={
                    <ProductListingPage
                      category={this.state.categories.find(
                        (item) => item.name === "clothes"
                      )}
                      currency={this.state.selectedCurrency}
                      onCardClick={this.handleProductCardClick}
                    />
                  }
                ></Route>
                <Route
                  path="/:productId"
                  element={
                    <HOCProductDescriptionPage
                      product={this.state.selectedProduct}
                      currency={this.state.selectedCurrency}
                    />
                  }
                />
              </Routes>
            </>
          )}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
