import { Component } from "react";
import CartItem from "./CartItem/CartItem";
import "./CartOverlay.scss";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  render() {
    return (
      <div className="cart__overlay">
        <div className="cart">
          <h3 className="cart__title">
            <b>My bag</b>, {this.state.counter} items
          </h3>
          <CartItem />
        </div>
      </div>
    );
  }
}

export default CartOverlay;
