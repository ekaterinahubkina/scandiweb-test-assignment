import { Component } from "react";
import { CartContext } from "../../../context/CartContext";
import CartItem from "../../CartItem/CartItem";
import "./CartOverlay.scss";

class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, total: 0, productAmount: 1 };
  }
  static contextType = CartContext;

  componentDidMount() {
    this.setState({ counter: this.context.length, total: this.countTotal() });
  }

  countTotal = () => {
    return this.context.reduce((acc, item) => {
      const currency = this.props.chooseCurrency(item.prices);
      acc += currency.amount;
      return acc;
    }, 0)
  }

  render() {
    return (
      <div className="cart__overlay">
        <div className="cart">
          <h3 className="cart__title">
            <b>My bag</b>, {this.state.counter} items
          </h3>
          <ul className="cart__items-list">
            {this.context &&
              this.context.map((item) => (
                <li key={item.name}>
                  <CartItem product={item} chooseCurrency={this.props.chooseCurrency} />
                </li>
              ))}

            {/* <li><CartItem /></li>
            <li><CartItem /></li> */}
          </ul>
          <div className="cart__total">
            Total: <span>{this.props.currency + this.state.total}</span>
          </div>
          <div className="cart__buttons">
            <button className="cart__btn cart__btn_type_view-bag">
              View Bag
            </button>
            <button className="cart__btn cart__btn_type_check-out">
              Check out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
