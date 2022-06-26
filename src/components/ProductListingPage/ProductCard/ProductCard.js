import { Component } from "react";
import "./ProductCard.scss";

class ProductCard extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <article className="product-card">
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            src="https://images.unsplash.com/photo-1655829312782-73af2a235638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8UzRNS0xBc0JCNzR8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="product"
          ></img>
        </div>

        <h4 className="product-card__title">Some product</h4>
        <p className="product-card__price">40$</p>
      </article>
    );
  }
}

export default ProductCard;
