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
    this.setState({ counter: this.context.length });
    this.countTotal();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.total !== prevState.total) {
  //     //this.setState({ price: this.countPrice() });
  //     this.countTotal();
  //   }
  // }

  // increment = (item) => {
  //   const product = this.context.find(el => el.name === item.name);
  //   product.amount = product.amount + 1;
  //   this.props.updateAmount(product, product.amount)
  // };
  // decrement = (item) => {
  //   const product = this.context.find(el => el.name === item.name);
  //   product.amount = product.amount + 1;
  //   this.props.updateAmount(product, product.amount)
  // };
  // countPrice = () => {
  //   const price = this.props.chooseCurrency(this.props.product.prices).productAmount * this.state.productAmount;
  //   return this.props.chooseCurrency(this.props.product.prices).currency.symbol + price;
  // }

  // countTotal = () => {
  //   return this.context.reduce((acc, item) => {
  //     const currency = this.props.chooseCurrency(item.prices);
  //     const price = currency.amount * item.amount;
  //    // debugger;
  //     return (acc += price);
      
  //   }, 0);
    
  // };

  countTotal = () => {
    
    const total = this.context.reduce((acc, item) => {
      const currency = this.props.chooseCurrency(item.prices);
      const price = currency.amount *item.amount;
      return acc + price;
    }, 0)
    this.setState({total: total})
  }

  // total = () => {
  //   this.setState({ total: this.countTotal() });
  // };

//   countPrice = (price) => {
// const price  = 
//   }

// const events = {
//   increment: item => {
//     let index = items.indexOf(item);
//     item.count = item.count + 1;
//     products[index] = item;

//     setItems([...products]);
//   },
//   decrement: item => {
//     let index = items.indexOf(item);
//     item.count = item.count - 1;
//     products[index] = item;

//     setItems([...products]);
//   }
// };

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
                  <CartItem 
                  increment={this.props.increment}
                  decrement={this.props.decrement}
                    product={item}
                    chooseCurrency={this.props.chooseCurrency}
                    countTotal={this.countTotal}
                    // updateAmount={this.props.updateAmount}
                  />
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
