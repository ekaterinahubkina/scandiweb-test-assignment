import { Component } from "react";
import { CartContext } from "../../context/CartContext";

const CartFunctionality = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { total: 0, quantity: 0, tax: 0 };
    }
    static contextType = CartContext;

    componentDidMount() {
      this.setState({
        quantity: this.context.length,
      });
      this.countTotal();
    }

    componentDidUpdate(prevProps) {
      if (this.props.currency !== prevProps.currency) {
        this.countTotal();
      }
    }

    countTotal = () => {
      const total = this.context.reduce((acc, item) => {
        const currency = this.props.chooseCurrency(item.prices);
        const price = currency.amount * item.amount;
        return acc + price;
      }, 0);
      this.setState({
        total: total.toFixed(2),
        tax: ((total / 100) * 21).toFixed(2),
      });
    };

    render() {
      return <WrappedComponent {...this.props} data={this.state} countTotal={this.countTotal}/>;
    }
  };
};

export default CartFunctionality;
