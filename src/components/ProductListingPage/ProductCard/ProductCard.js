import { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

class ProductCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.price = this.chooseCurrency();
  //   this.state = {currency: this.props.product.prices.find((item) => item.currency.symbol === this.props.currency)};
  //   //debugger;
  // }
  chooseCurrency = () => {
    return this.props.product.prices.find(
      (item) => item.currency.symbol === this.props.currency
    );
  };

  handleCardClick = () => {

    this.props.onCardClick(this.props.product);
    // debugger;
    console.log(this.props.product.id)
  }

  render() {
    return (
      <Link to={`/${this.props.product.id}`} onClick={this.handleCardClick}>
        <article className="product-card">
          <div className="product-card__image-container">
            <img
              className="product-card__image"
              src={this.props.product.gallery[0]}
              alt={this.props.product.name}
            ></img>
          </div>

          <h4 className="product-card__title">{this.props.product.name}</h4>
          <p className="product-card__price">
            {this.chooseCurrency().currency.symbol}
            {this.chooseCurrency().amount}
          </p>
        </article>
      </Link>
    );
  }
}

export default ProductCard;
