import { Component } from "react";
import CartProductFunctionality from "../CartProduct/CartProductFunctionality";
import SelectedAttributes from "../SelectedAttributes/SelectedAttributes";
import "./CartOverlayProduct.scss";

class CartItem extends Component {
  render() {
    const classNames = {
      attributeName: "cart-overlay__attribute-name",
      attributeItemsContainer: "cart-overlay__attribute-items",
      attributeSwatch: "cart-overlay__attribute-swatch",
      attributeText: "cart-overlay__attribute-text",
    };
    return (
      <article className="cart-item">
        <div className="cart-item__info">
          <div>
            <h2 className="cart-item__brand">{this.props.product.brand}</h2>
            <h3 className="cart-item__name">{this.props.product.name}</h3>
          </div>

          <p className="cart-item__price">
            {this.props.currency + this.props.data.price}
          </p>
          <div className="cart-item__attributes">
            {this.props.product.attributes.map((attribute) => (
              <SelectedAttributes
                key={attribute.name}
                attribute={attribute}
                classNames={classNames}
                activeClassName={this.props.data.activeAttributeClassName}
              />
            ))}
          </div>
        </div>
        <div className="cart-item__amount">
          <button
            className="cart-item__btn cart-item__btn_type_plus"
            onClick={this.props.data.increment}
          ></button>
          <span className="cart-item__number">{this.props.product.amount}</span>
          <button
            className="cart-item__btn cart-item__btn_type_minus"
            onClick={this.props.data.decrement}
          ></button>
        </div>
        <img
          className="cart-item__img"
          src={this.props.product.gallery[0]}
          alt="product"
        ></img>
      </article>
    );
  }
}

const CartItemWithFunctionality = CartProductFunctionality(CartItem);

export default CartItemWithFunctionality;
