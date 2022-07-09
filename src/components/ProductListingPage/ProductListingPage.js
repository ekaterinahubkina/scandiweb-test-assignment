import { Component } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard/ProductCard";
import "./ProductListingPage.scss";

class ProductListingPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <section className="products">
        <h2 className="products__category-name">{this.props.category.name}</h2>
        <ul className="products__list">
          {/* {this.props.children} */}
          {this.props.category.products.map((item) => (
            <ProductCard
              product={item}
              key={item.id}
              currency={this.props.currency}
              onCardClick={this.props.onCardClick}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default ProductListingPage;
