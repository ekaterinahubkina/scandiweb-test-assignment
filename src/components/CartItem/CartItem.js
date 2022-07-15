import { Component } from "react";
import Attributes from "../ProductDescriptionPage/Attributes/Attributes";
import "./CartItem.scss";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: 1, price: 0 };
  }
  componentDidMount() {
    this.setState({ price: this.countPrice() });
    this.props.countTotal(this.state.amount);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.amount !== prevState.amount) {
      this.setState({ price: this.countPrice() });
      this.props.countTotal(this.state.amount);
    }
  }

  increment = () => {
    this.setState({ amount: this.state.amount + 1 });
  };

  decrement = () => {
    this.setState({ amount: this.state.amount - 1 });
  };

  countPrice = () => {
    const price =
      this.props.chooseCurrency(this.props.product.prices).amount *
      this.state.amount;
    return (
      this.props.chooseCurrency(this.props.product.prices).currency.symbol +
      price
    );
  };

  render() {
    return (
      <article className="cart-item">
        <div className="cart-item__info">
          <h2 className="cart-item__brand">{this.props.product.brand}</h2>
          <h3 className="cart-item__name">{this.props.product.name}</h3>
          <p className="cart-item__price">{this.state.price}</p>

          {/* <>
            <h4 className="cart-item__title">Apollo Running Short</h4>
            <p className="cart-item__price">$50</p>
          </> */}

          <div className="cart-item__attributes">
            {this.props.product.attributes.map((attribute) => (
              <Attributes
                key={attribute.name}
                attribute={attribute}
                textClassName="attributes__value_cart-text"
                swatchClassName="attributes__value_cart-swatch"
              />
            ))}
          </div>
          {/* <>
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
              <div
                className="cart-item__color"
                style={{ backgroundColor: "blue" }}
              ></div>
              <div
                className="cart-item__color"
                style={{ backgroundColor: "green" }}
              ></div>
              <div
                className="cart-item__color"
                style={{ backgroundColor: "yellow" }}
              ></div>
            </div>
          </> */}
        </div>
        <div className="cart-item__amount">
          <button
            className="cart-item__btn cart-item__btn_type_plus"
            onClick={this.increment}
          ></button>
          <span className="cart-item__number">{this.state.amount}</span>
          <button
            className="cart-item__btn cart-item__btn_type_minus"
            onClick={this.decrement}
            disabled={this.state.amount === 1}
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

export default CartItem;
