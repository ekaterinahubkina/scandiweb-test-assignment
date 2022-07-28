import React, { Component } from "react";
import Carousel from "../Carousel/Carousel";
import "./CartProduct.scss";
import CartProductFunctionality from "./CartProductFunctionality";
import SelectedAttributes from "../SelectedAttributes/SelectedAttributes";

class CartProduct extends Component {
  render() {
    const classNames = {
      attributeName: "cart__attribute-name",
      attributeItemsContainer: "cart__attribute-items",
      attributeSwatch: "cart__attribute-swatch",
      attributeText: "cart__attribute-text",
    };
    return (
      <article className="cart-product">
        <div className="cart-product__info">
          <h2 className="cart-product__brand">{this.props.product.brand}</h2>
          <h3 className="cart-product__name">{this.props.product.name}</h3>
          <p className="cart-product__price">
            {this.props.currency + this.props.data.price}
          </p>
          <div className="cart-product__attributes">
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
        <div className="cart-product__amount">
          <button
            className="cart-product__button cart-product__button_type_plus"
            onClick={this.props.data.increment}
          ></button>
          <span className="cart-item__number">{this.props.product.amount}</span>
          <button
            className="cart-product__button cart-product__button_type_minus"
            onClick={this.props.data.decrement}
            //disabled={this.state.amount === 1}
          ></button>
        </div>
        <Carousel gallery={this.props.product.gallery} />
      </article>
    );
  }
}
const CartProductWithFunctionality = CartProductFunctionality(CartProduct);
export default CartProductWithFunctionality;
