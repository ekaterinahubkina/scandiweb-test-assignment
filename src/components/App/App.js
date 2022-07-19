import "./App.css";
import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getProducts } from "../../utils/GraphqlApi";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import { CartContext } from "../../context/CartContext";
import ProductListingPage from "../ProductListingPage/ProductListingPage";
import HOCProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import CartOverlay from "../Header/CartOverlay/CartOverlay";

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
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      isCartOverlayOpen: false,
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

  chooseCurrency = (arr) => {
    return arr.find(
      (item) => item.currency.symbol === this.state.selectedCurrency
    );
  };

  handleProductCardClick = (card) => {
    this.setState({ selectedProduct: { ...card } });
  };

  addToCart = (item) => {
    const newCartItems = [item, ...this.state.cartItems];
    this.setState({ cartItems: newCartItems });
    localStorage.setItem(
      "cart",
      JSON.stringify([item, ...this.state.cartItems])
    );
  };

  toggleCartOverlay = () => {
    this.setState({ isCartOverlayOpen: !this.state.isCartOverlayOpen });
  };

  // handleUpdateAmount = (item, amount) => {
  //   const newArr = this.state.cartItems.map((product) =>
  //     product.name === item.name ? { ...product, amount: amount } : product
  //   );
  //   // const product = this.state.cartItems.find((product) => product.name === item.name);
  //   // product.amount = amount;
  //   // const newCartItems = [product, ...this.state.cartItems]
  //   this.setState({ cartItems: newArr });
  //   localStorage.setItem("cart", JSON.stringify(newArr));
  // };

  increment = (name) => {
    const newArr = this.state.cartItems.map((product) =>
      product.name === name
        ? { ...product, amount: product.amount + 1 }
        : product
    );
    // const product = this.state.cartItems.find(el => el.name === name);
    // product.amount = product.amount + 1;
    // product.price = product.price * product.amount;

    this.setState({ cartItems: newArr });
    localStorage.setItem("cart", JSON.stringify(newArr));
  };
  decrement = (name) => {
    const newArr = this.state.cartItems.map((product) =>
      product.name === name
        ? { ...product, amount: product.amount - 1 }
        : product
    );
    // const product = this.state.cartItems.find(el => el.name === name);
    // product.amount = product.amount - 1;
    // product.price = product.price * product.amount;
    this.setState({ cartItems: newArr });
    localStorage.setItem("cart", JSON.stringify(newArr));
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <CartContext.Provider value={this.state.cartItems}>
          <div className="page">
            {this.state.currencies.length > 0 && (
              <>
                <Header
                  categories={this.state.categories}
                  currencies={this.state.currencies}
                  selectCurrency={this.selectCurrency}
                  onCartIconClick={this.toggleCartOverlay}
                />
                {this.state.isCartOverlayOpen && (
                  <CartOverlay
                    currency={this.state.selectedCurrency}
                    chooseCurrency={this.chooseCurrency}
                    updateAmount={this.handleUpdateAmount}
                    increment={this.increment}
                    decrement={this.decrement}
                  />
                )}

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
                        chooseCurrency={this.chooseCurrency}
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
                        chooseCurrency={this.chooseCurrency}
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
                        chooseCurrency={this.chooseCurrency}
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
                        chooseCurrency={this.chooseCurrency}
                        addToCart={this.addToCart}
                      />
                    }
                  />
                </Routes>
              </>
            )}
          </div>
        </CartContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
