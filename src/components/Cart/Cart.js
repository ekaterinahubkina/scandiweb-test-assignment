import { Component } from "react";
import Carousel from "./Carousel/Carousel";

class Cart extends Component {
  render() {
    return (
      <section className="cart">
        <h2 className="cart__title">Cart</h2>
        <div className="cart__products"></div>
        <Carousel/>
      </section>
    );
  }
}

export default Cart;
