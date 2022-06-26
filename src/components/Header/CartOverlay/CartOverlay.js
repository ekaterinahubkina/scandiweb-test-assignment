import { Component } from "react";
import CartItem from "./CartItem/CartItem";
import "./CartOverlay.scss";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, total: 0 };
  }
  render() {
    return (
      <div className="cart__overlay">
        <div className="cart">
          <h3 className="cart__title">
            <b>My bag</b>, {this.state.counter} items
          </h3>
          <ul className="cart__items-list">
            <li><CartItem /></li>
            <li><CartItem /></li>
            <li><CartItem /></li>
          </ul>
          <div className="cart__total">Total: <span>{this.state.totals}</span></div>
          <div className="cart__buttons">
            <button className="cart__btn cart__btn_type_view-bag">View Bag</button>
            <button className="cart__btn cart__btn_type_check-out">Check out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
