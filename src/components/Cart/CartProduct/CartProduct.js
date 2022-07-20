import React, { Component } from "react";
import Carousel from "../Carousel/Carousel";
import "./CartProduct.scss";
import { displayTextValues } from "../../../utils/utils";

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { price: 0 };
  }

  componentDidMount() {
    this.setState({
      price: this.countPrice(),
      amount: this.props.product.amout,
    });
    //this.props.countTotal();
  }

    componentDidUpdate(prevProps, prevState) {
      if (this.props.product !== prevProps.product) {
        this.setState({ price: this.countPrice() });
        //this.props.countTotal();
        this.props.product.amount < 1 && this.props.deleteFromCart(this.props.product);
        // this.props.updateAmount(this.props.product, this.state.amount);
        // debugger
      }
    }

  increment = () => {
    this.props.increment(this.props.product.name);
    //this.setState({ amount: this.state.amount + 1 });
    // this.props.updateAmount(this.props.product, this.state.amount);
    // debugger
  };

  decrement = () => {
    //this.setState({ amount: this.state.amount - 1 });
    this.props.decrement(this.props.product.name);
    
  };

  countPrice = () => {
    const price =
      this.props.chooseCurrency(this.props.product.prices).amount *
      this.props.product.amount;
    return (
      this.props.chooseCurrency(this.props.product.prices).currency.symbol +
      price
    );
  };

  activeAttributeTypeText = (item, attr) => {
    let attributeClassname = "cart-product__attribute-text";
    this.props.product.selectedAttributes.forEach((el) => {
      if (item.displayValue === el[attr.name]) {
        attributeClassname = `${attributeClassname} ${attributeClassname}_active`;
      }
    });
    return attributeClassname;
  };

  activeAttributeTypeSwatch = (item, attr) => {
    let attributeClassname = "cart-product__attribute-swatch";
    this.props.product.selectedAttributes.forEach((el) => {
      if (item.displayValue === el[attr.name]) {
        attributeClassname = `${attributeClassname} ${attributeClassname}_active`;
      }
    });
    return attributeClassname;
  };

  //   addActiveAttributeClassname = (item, arr, attr, className) => {
  //     let attributeClassname = "";
  //     let attributeSwatchClassname = "";
  //     arr.forEach((element) => {
  //       // debugger

  //       attributeClassname =
  //         item.displayValue === element[attr.name]
  //           ? `${className} ${className}_active`
  //           : className;
  //       console.log(
  //         element,
  //         item.displayValue,
  //         element[attr.name],
  //         attributeClassname
  //       );
  //     });
  //     //debugger
  //     return attributeClassname;
  //   };
  render() {
    return (
      <article className="cart-product">
        <div className="cart-product__info">
          <h2 className="cart-product__brand">{this.props.product.brand}</h2>
          <h3 className="cart-product__name">{this.props.product.name}</h3>
          <p className="cart-product__price">{this.state.price}</p>
          <div className="cart-product__attributes">
            {this.props.product.attributes.map((attribute) => (
              <React.Fragment key={attribute.name}>
                <p className="cart-product__attribute-name">
                  {attribute.name}:
                </p>
                <div className="cart-product__attribute-items">
                  {attribute.items.map((item) =>
                    attribute.type === "swatch" ? (
                      <div
                        key={item.id}
                        className={this.activeAttributeTypeSwatch(
                          item,
                          attribute
                        )}
                        style={{ backgroundColor: item.displayValue }}
                      ></div>
                    ) : (
                      <div
                        key={item.id}
                        className={this.activeAttributeTypeText(
                          item,
                          attribute
                        )}
                      >
                        {displayTextValues(item.displayValue)}
                      </div>
                    )
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="cart-product__amount">
          <button
            className="cart-product__button cart-product__button_type_plus"
            onClick={this.increment}
          ></button>
          <span className="cart-item__number">{this.props.product.amount}</span>
          <button
            className="cart-product__button cart-product__button_type_minus"
            onClick={this.decrement}
            //disabled={this.state.amount === 1}
          ></button>
        </div>
        <Carousel gallery={this.props.product.gallery} />
      </article>
    );
  }
}

export default CartProduct;
