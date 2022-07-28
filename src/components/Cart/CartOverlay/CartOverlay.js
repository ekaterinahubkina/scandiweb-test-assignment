import { Component } from "react";
import { CartContext } from "../../../context/CartContext";
import CartFunctionality from "../CartFunctionality";
import CartItemWithFunctionality from "../CartOverlayProduct/CartOverlayProduct";
import "./CartOverlay.scss";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

class CartOverlay extends Component {
  static contextType = CartContext;

  render() {
    return createPortal(
      <div className="cart-overlay__container">
        <div className="cart-overlay">
          <h3 className="cart-overlay__title">
            <b>My bag</b>, {this.context.length} items
          </h3>
          <ul className="cart-overlay__items-list">
            {this.context &&
              this.context.map((item) => (
                <li key={item.name}>
                  <CartItemWithFunctionality
                    increment={this.props.increment}
                    decrement={this.props.decrement}
                    product={item}
                    currency={this.props.currency}
                    chooseCurrency={this.props.chooseCurrency}
                    countTotal={this.props.countTotal}
                    deleteFromCart={this.props.deleteFromCart}
                  />
                </li>
              ))}
          </ul>
          <div className="cart-overlay__total">
            Total: <span>{this.props.currency + this.props.data.total}</span>
          </div>
          <div className="cart-overlay__buttons">
            <NavLink to="/cart" onClick={this.props.close}>
              <button className="cart-overlay__btn cart-overlay__btn_type_view-bag">
                View Bag
              </button>
            </NavLink>
            <button className="cart-overlay__btn cart-overlay__btn_type_check-out">
              Check out
            </button>
          </div>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
}

const CartOverlayWithFunctionality = CartFunctionality(CartOverlay);
export default CartOverlayWithFunctionality;
