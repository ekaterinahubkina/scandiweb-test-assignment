import { Component } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";
import CartProduct from "./CartProduct/CartProduct";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { total: 0, quantity: 0, tax: 0 };
  }
  static contextType = CartContext;

  componentDidMount() {
    this.setState({
      quantity: this.context.length,
    });
    //this.props.countTotal();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   this.setState({
  //     quantity: this.context.length,
  //   });
  // }

  render() {
    return (
      <section className="cart">
        <h2 className="cart__title">Cart</h2>
        <ul className="cart__products-list">
          {this.context &&
            this.context.map((item) => (
              <li className="cart__product" key={item.name}>
                <CartProduct
                  product={item}
                  increment={this.props.increment}
                  decrement={this.props.decrement}
                  chooseCurrency={this.props.chooseCurrency}
                  deleteFromCart={this.props.deleteFromCart}
                />
              </li>
            ))}
        </ul>
        <div className="cart__total">
          <p>Tax 21%: {this.state.tax}</p>
          <p>Quantity: {this.context.length}</p>
          <p>Total: {this.state.total}</p>
        </div>
        <button className="cart__order-button">order</button>
      </section>
    );
  }
}

export default Cart;
