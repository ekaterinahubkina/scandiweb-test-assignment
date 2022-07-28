import { Component } from "react";
import { CartContext } from "../../context/CartContext";
import CartFunctionality from "./CartFunctionality";
import "./Cart.scss";
import CartProductWithFunctionality from "./CartProduct/CartProduct";

class Cart extends Component {
  static contextType = CartContext;

  render() {
    return (
      <section className="cart">
        <h2 className="cart__title">Cart</h2>
        <ul className="cart__products-list">
          {this.context &&
            this.context.map((item) => (
              <li className="cart__product" key={item.name}>
                <CartProductWithFunctionality
                  product={item}
                  increment={this.props.increment}
                  decrement={this.props.decrement}
                  currency={this.props.currency}
                  chooseCurrency={this.props.chooseCurrency}
                  countTotal={this.props.countTotal}
                  deleteFromCart={this.props.deleteFromCart}
                />
              </li>
            ))}
        </ul>
        <div className="cart__total">
          <p>Tax 21%: {this.props.currency + this.props.data.tax}</p>
          <p>Quantity: {this.context.length}</p>
          <p>Total: {this.props.currency + this.props.data.total}</p>
        </div>
        <button className="cart__order-button">order</button>
      </section>
    );
  }
}
const CartWithFunctionality = CartFunctionality(Cart);
export default CartWithFunctionality;
