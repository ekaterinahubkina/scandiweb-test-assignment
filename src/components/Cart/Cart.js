import { Component } from "react";

class Cart extends Component {
  render() {
    return (
      <section className="cart">
        <h2 className="cart__title">Cart</h2>
        <div className="cart__products"></div>
      </section>
    );
  }
}

export default Cart;
