import { Component } from "react"

const CartProductFunctionality = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { price: 0, amount: 0 };
            this.symbol = this.props.chooseCurrency(this.props.product.prices).currency.symbol;
          }
        
          componentDidMount() {
            this.setState({
              price: this.countPrice(),
              amount: this.props.product.amout,
            });
          }
        
          componentDidUpdate(prevProps, prevState) {
            if (this.props.product !== prevProps.product) {
              this.setState({ price: this.countPrice() });
              this.props.countTotal();
              this.props.product.amount < 1 &&
                this.props.deleteFromCart(this.props.product);
              // debugger
            }
            if (this.props.currency !== prevProps.currency) {
              this.setState({ price: this.countPrice() });
              // debugger
            }
          }
        
          increment = () => {
            this.props.increment(this.props.product.name);
          };
        
          decrement = () => {
            this.props.decrement(this.props.product.name);
          };
        
          countPrice = () => {
            const price =
              this.props.chooseCurrency(this.props.product.prices).amount *
              this.props.product.amount;
        
            return price.toFixed(2);
          };
        
          activeAttributeClassName = (item, attr, className) => {
            let attributeClassname = className;
            this.props.product.selectedAttributes.forEach((el) => {
              if (item.displayValue === el[attr.name]) {
                attributeClassname = `${attributeClassname} ${attributeClassname}_active`;
              }
            });
            return attributeClassname;
          };
        
          // activeAttributeTypeSwatch = (item, attr) => {
          //   let attributeClassname = "cart-product__attribute-swatch";
          //   this.props.product.selectedAttributes.forEach((el) => {
          //     if (item.displayValue === el[attr.name]) {
          //       attributeClassname = `${attributeClassname} ${attributeClassname}_active`;
          //     }
          //   });
          //   return attributeClassname;
          // };

          render() {
            const data = {
                price: this.state.price,
                amount: this.state.amount,
                activeAttributeClassName: this.activeAttributeClassName,
                decrement: this.decrement,
                increment: this.increment,
                countPrice: this.countPrice,
            }
            return <WrappedComponent {...this.props} data={data} countTotal={this.countTotal}/>;
          }

        
    }
}

export default CartProductFunctionality;