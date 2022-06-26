import { Component } from "react";
import './ProductListingPage.scss';

class ProductListingPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <section className="products">
        <h2 className="products__category-name">{this.props.categoryName}</h2>
        <ul className="products__list">
          {this.props.children}
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /> */}
        </ul>
      </section>
    );
  }
}

export default ProductListingPage;
