import { Component } from "react";
import "./Carousel.scss";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0, width: 200 };
  }
  handleLeftBtnClick = () => {
    const newOffset = this.state.offset + this.state.width;
    console.log(newOffset);
    this.setState({ offset: Math.min(newOffset, 0) });
  };
  handleRightBtnClick = () => {
    const newOffset = this.state.offset - this.state.width;
    const maxOffset = -(this.state.width * (this.props.gallery.length - 1)); //arr.length - 1
    console.log(maxOffset, newOffset);
    this.setState({
      offset: Math.max(newOffset, maxOffset),
    });
  };
  render() {
    return (
      <div className="carousel">
        <div
          className="carousel__container"
          style={{ transform: `translateX(${this.state.offset}px)` }}
        >
          {this.props.gallery.map((item, index) => (
            <img
              key={index}
              className="carousel__item"
              src={item}
              alt="product"
            ></img>
          ))}
          {/* <img
            className="carousel__item"
            src="https://images.unsplash.com/photo-1657561321371-2901ba93e9ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="sdsdsd"
          ></img>
          <img
            className="carousel__item"
            src="https://images.unsplash.com/photo-1657906538781-2bd7db3ea521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="sdsdsd"
          ></img>
          <img
            className="carousel__item"
            src="https://images.unsplash.com/photo-1658005970556-6f4ba1da9aff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="sdsdsd"
          ></img> */}
        </div>
        {this.props.gallery.length > 1 && (
          <div className="carousel__btns-container">
            <button
              className="carousel__button carousel__button_type_left"
              onClick={this.handleLeftBtnClick}
            ></button>
            <button
              className="carousel__button carousel__button_type_right"
              onClick={this.handleRightBtnClick}
            ></button>
          </div>
        )}
      </div>
    );
  }
}

export default Carousel;
