import "./App.css";
import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getProducts } from "../../utils/GraphqlApi";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import { CartContext } from "../../context/CartContext";
import ProductListingPage from "../ProductListingPage/ProductListingPage";
import HOCProductDescriptionPage from "../ProductDescriptionPage/ProductDescriptionPage";
import CartWithFunctionality from "../Cart/Cart";
import CartOverlayWithFunctionality from "../Cart/CartOverlay/CartOverlay";

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
      selectedCurrency: "",
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
        this.setState({
          categories: data.data.categories,
          currencies: data.data.currencies,
          selectedCurrency:
            JSON.parse(localStorage.getItem("selectedCurrency")) ||
            data.data.currencies[0].symbol,
        });
        // this.setState(() => {
        //   return {
        //     categories: data.data.categories,
        //     currencies: data.data.currencies,
        //   };
        // });
      })
      .catch((err) => console.log(err));
  }

  selectCurrency = (currency) => {
    this.setState({ selectedCurrency: currency });
    localStorage.setItem("selectedCurrency", JSON.stringify(currency));
  };

  chooseCurrency = (arr) => {
    return arr.find(
      (item) => item.currency.symbol === this.state.selectedCurrency
    );
  };

  handleProductCardClick = (card) => {
    this.setState({ selectedProduct: { ...card } });
  };

  compare = (item) => {
    let res;
    if (this.state.cartItems.some((product) => product.name === item.name)) {
      const compared = this.state.cartItems.find(
        (product) => product.name === item.name
      );
      const newAttributesFiltered = item.selectedAttributes.sort((a, b) => {
        if (Object.keys(a)[0] > Object.keys(b)[0]) return 1;
        return -1;
      });
      console.log(newAttributesFiltered);
      const oldAttributesFiltered = compared.selectedAttributes.sort((a, b) => {
        if (Object.keys(a)[0] > Object.keys(b)[0]) return 1;
        return -1;
      });
      console.log(oldAttributesFiltered);
      const first = JSON.stringify(oldAttributesFiltered);
      const second = JSON.stringify(newAttributesFiltered);

      console.log(first);
      console.log(second);
      first === second ? (res = true) : (res = false);
    }
    console.log(res);
    return res;
  };

  addToCart = (item) => {
    if (this.compare(item)) {
      const compared = this.state.cartItems.find(
        (product) => product.name === item.name
      );
      compared.amount++;
    } else {
      const newCartItems = [item, ...this.state.cartItems];
      this.setState({ cartItems: newCartItems });
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
    ///need to be tested & fixed!!!
  };

  deleteFromCart = (item) => {
    const newCartItems = this.state.cartItems.filter((el) => el.id !== item.id);
    this.setState({ cartItems: newCartItems });
    //debugger
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  toggleCartOverlay = () => {
    this.setState({ isCartOverlayOpen: !this.state.isCartOverlayOpen });
  };

  increment = (name) => {
    const newArr = this.state.cartItems.map((product) =>
      product.name === name
        ? { ...product, amount: product.amount + 1 }
        : product
    );
    this.setState({ cartItems: newArr });
    localStorage.setItem("cart", JSON.stringify(newArr));
  };

  decrement = (name) => {
    const newArr = this.state.cartItems.map((product) =>
      product.name === name
        ? { ...product, amount: product.amount - 1 }
        : product
    );
    this.setState({ cartItems: newArr });
    localStorage.setItem("cart", JSON.stringify(newArr));
  };

  render() {
    console.log("render APP");
    return (
      <ApolloProvider client={client}>
        <CartContext.Provider value={this.state.cartItems}>
          <div className="page">
            {this.state.currencies.length > 0 && (
              <>
                <Header
                  categories={this.state.categories}
                  currencies={this.state.currencies}
                  currency={this.state.selectedCurrency}
                  selectCurrency={this.selectCurrency}
                  onCartIconClick={this.toggleCartOverlay}
                />
                {this.state.isCartOverlayOpen && (
                  <CartOverlayWithFunctionality
                    currency={this.state.selectedCurrency}
                    chooseCurrency={this.chooseCurrency}
                    increment={this.increment}
                    decrement={this.decrement}
                    deleteFromCart={this.deleteFromCart}
                    close={this.toggleCartOverlay}
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
                        compare={this.compare}
                      />
                    }
                  ></Route>
                  <Route
                    path="/cart"
                    element={
                      <CartWithFunctionality
                        chooseCurrency={this.chooseCurrency}
                        currency={this.state.selectedCurrency}
                        increment={this.increment}
                        decrement={this.decrement}
                        deleteFromCart={this.deleteFromCart}
                      />
                    }
                  ></Route>
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
