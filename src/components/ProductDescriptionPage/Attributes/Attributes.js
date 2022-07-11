import { Component } from "react";
import "./Attributes.scss";

class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = { activeAttribute: "", activeSwatchAttribute: "" };
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleSwatchAttributeChange = this.handleSwatchAttributeChange.bind(this);
  }

  handleAttributeChange(e) {
    this.setState({ activeAttribute: e.target.value });
  }

  handleSwatchAttributeChange(e) {
    this.setState({ activeSwatchAttribute: e.target.value });
  }

  render() {
    return (
      <>
        {this.props.attributes.map((attribute, index) => (
          <div className="attributes" key={index}>
            <h3 className="attributes__name">{attribute.name}:</h3>
            <div className="attributes__container">
              {attribute.items.map((item) =>
                attribute.type === "swatch" ? (
                  <label
                    key={item.id}
                    className={`attributes__value attributes__value_type_swatch ${
                      this.state.activeSwatchAttribute === item.displayValue &&
                      "attributes__value_type_swatch_active"
                    }`}
                    htmlFor={item.displayValue}
                    style={{ backgroundColor: item.displayValue }}
                  >
                    <input
                      type="radio"
                      id={item.displayValue}
                      name="attribute"
                      value={item.displayValue}
                      onChange={this.handleSwatchAttributeChange}
                    ></input>
                  </label>
                ) : (
                  // <div
                  //   key={item.id}
                  //   className="attributes__value"
                  //   style={{ backgroundColor: item.displayValue }}
                  //   onClick={this.handleSwatchAttributeClick}
                  // ></div>
                  <label
                    key={item.id}
                    className={`attributes__value attributes__value_type_text ${
                      this.state.activeAttribute === item.displayValue &&
                      "attributes__value_type_text_active"
                    }`}
                    htmlFor={item.displayValue}
                  >
                    {item.displayValue}
                    <input
                      type="radio"
                      id={item.displayValue}
                      name="attribute"
                      value={item.displayValue}
                      onChange={this.handleAttributeChange}
                    ></input>
                  </label>
                )
              )}
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default Attributes;
