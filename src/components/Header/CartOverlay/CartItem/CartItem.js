import { Component } from "react";
import "./CartItem.scss";

class CartItem extends Component {
  render() {
    return (
      <article className="cart-item">
        <div className="cart-item__info">
          <>
            <h4 className="cart-item__title">Apollo Running Short</h4>
            <p className="cart-item__price">$50</p>
          </>
          <>
            <span>Size:</span>
            <div className="cart-item__available-sizes">
              <div className="cart-item__size"></div>
              <div className="cart-item__size"></div>
              <div className="cart-item__size"></div>
            </div>
          </>
          <>
            <span>Color:</span>
            <div className="cart-item__available-colors">
              <div className="cart-item__color"></div>
              <div className="cart-item__color"></div>
              <div className="cart-item__color"></div>
            </div>
          </>
        </div>
        <div className="cart-item__amount">
          <button className="cart-item__btn cart-item__btn_type_plus"></button>
          <span className="cart-item__number">1</span>
          <button className="cart-item__btn cart-item__btn_type_minus"></button>
        </div>
        <img
          className="cart-item__img"
          src="https://images.unsplash.com/photo-1654512697681-8434b50096dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="product"
        ></img>
      </article>
    );
  }
}

export default CartItem;
