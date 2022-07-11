import { Component } from "react";
import { client } from "../App/App";
import "./ProductDescriptionPage.scss";
import { getProduct } from "../../utils/GraphqlApi";
import { useParams } from "react-router-dom";
import Attributes from "./Attributes/Attributes";
// import {useLocation} from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
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
      id: this.props.params.productId,
      isLoading: true,
    };
    this.selectImg = this.selectImg.bind(this);
  }
  componentDidMount() {
    // this.setState({
    //   id : this.props.params.productId
    // })
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

  selectImg(e) {
    this.setState({ selectedImg: e.target.src });
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
        {/* <div className="product-description__container"> */}
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
          <Attributes attributes={this.state.product.attributes} />
          <div className="product-description__price">
            Price:
            <span>$50</span>
          </div>
          <button className="product-description__add-to-cart-btn">
            add to cart
          </button>
          <div className="product-description__description"></div>
        </div>

        {/* </div> */}
      </section>
    ) : (
      <p>ISLOADING</p>
    );
  }
}

const HOCProductDescriptionPage = withRouter(ProductDescriptionPage);
export default HOCProductDescriptionPage;
