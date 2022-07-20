import { Component } from "react";
import { client } from "../App/App";
import "./ProductDescriptionPage.scss";
import { getProduct } from "../../utils/GraphqlApi";
import { useParams } from "react-router-dom";
import Attributes from "./Attributes/Attributes";
// import {useLocation} from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouter(props) {
    const params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

class ProductDescriptionPage extends Component {
  constructor(props) {
    // debugger;
    super(props);
    // this.location = this.props.location;

    this.state = {
      selectedImg: "",
      product: {},
      selectedAttributes: [],
      id: this.props.params.productId,
      isLoading: true,
    };
    this.selectImg = this.selectImg.bind(this);
  }
  componentDidMount() {
    client
      .query({ query: getProduct, variables: { id: this.state.id } })
      .then((data) => {
        console.log(data);
        this.setState(() => {
          return {
            isLoading: false,
            product: data.data.product,
            selectedImg: data.data.product.gallery[0],
          };
        });
      })
      .catch((err) => console.log(err));
  }

  // chooseCurrency = () => {
  //   return this.state.product.prices.find(
  //     (item) => item.currency.symbol === this.props.currency
  //   );
  // };

  selectImg(e) {
    this.setState({ selectedImg: e.target.src });
  }

  selectAttributes = (name, value) => {
    const attribute = {
     // ...this.state.selectedAttributes,
    [name]: value
    }
    const attributes = [...this.state.selectedAttributes];
    attributes.push(attribute)
    this.setState({selectedAttributes: attributes})

  }

  handleAddToCartClick = () => {
    //const price = this.props.chooseCurrency(this.state.product.prices).amount;
    const product = {
      ...this.state.product,
      amount: 1,
      // price: price,
      selectedAttributes: this.state.selectedAttributes
    }
    this.setState({
      product: product
  })
    this.props.addToCart(product)
    // debugger
  }
  render() {
    return !this.state.isLoading ? (
      <section className="product-description">
        <div className="product-description__gallery">
          {this.state.product.gallery.map((link, i) => (
            <img
              key={i}
              className="product-description__gallery-img"
              src={link}
              alt="product"
              onClick={this.selectImg}
            ></img>
          ))}
        </div>
        <img
          className="product-description__selected-img"
          src={this.state.selectedImg}
          alt="selected-img"
        ></img>
        <div className="product-description__container">
          <h2 className="product-description__brand">
            {this.state.product.brand}
          </h2>
          <h3 className="product-description__name">
            {this.state.product.name}
          </h3>
          <div className="attributes">
            {this.state.product.attributes.map((attribute) => (
              <Attributes key={attribute.name} attribute={attribute} selectAttributes={this.selectAttributes}/>
            ))}
          </div>
          <div className="product-description__price">
            Price:
            <div>
              {this.props.chooseCurrency(this.state.product.prices).currency.symbol}
              {this.props.chooseCurrency(this.state.product.prices).amount}
            </div>
          </div>
          <button className="product-description__add-to-cart-btn" onClick={this.handleAddToCartClick}>
            add to cart
          </button>
          <div className="product-description__description" dangerouslySetInnerHTML={{ __html: this.state.product.description }}></div>
        </div>
      </section>
    ) : (
      <p>ISLOADING</p>
    );
  }
}

const HOCProductDescriptionPage = withRouter(ProductDescriptionPage);
export default HOCProductDescriptionPage;
