import { Component } from "react";
import "./Attributes.scss";

class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = { activeAttribute: "", activeSwatchAttribute: "" };
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleSwatchAttributeChange =
      this.handleSwatchAttributeChange.bind(this);
      this.displayTextValues = this.displayTextValues.bind(this);
  }

  handleAttributeChange(e) {
    this.setState({ activeAttribute: e.target.value });
    this.props.selectAttributes(this.props.attribute.name, e.target.value)
  }

  handleSwatchAttributeChange(e) {
    this.setState({ activeSwatchAttribute: e.target.value });
  }

  displayTextValues(value) {
    switch (value.toLowerCase()) {
      case "small":
        return "S";
      case "medium":
        return "M";
      case "large":
        return "L";
      case "extra large":
        return "XL";
      default:
        return value;
    }
  }

  render() {
    return (
      <>
        <h4 className="attributes__name">{this.props.attribute.name}:</h4>
        <div className="attributes__container">
          {this.props.attribute.items.map((item) =>
            this.props.attribute.type === "swatch" ? (
              <label
                key={item.id}
                className={`attributes__value attributes__value_type_swatch ${
                  this.props.swatchClassName && this.props.swatchClassName
                } ${
                  this.state.activeSwatchAttribute === item.displayValue &&
                  "attributes__value_type_swatch_active"
                }`}
                htmlFor={`${this.props.attribute.name}_${item.displayValue}`}
                style={{ backgroundColor: item.displayValue }}
              >
                <input
                  type="radio"
                  id={`${this.props.attribute.name}_${item.displayValue}`}
                  name={this.props.attribute.name}
                  value={item.displayValue}
                  onChange={this.handleSwatchAttributeChange}
                ></input>
              </label>
            ) : (
              <label
                key={item.id}
                className={`attributes__value attributes__value_type_text ${
                  this.props.textClassName && this.props.textClassName
                } ${
                  this.state.activeAttribute === item.displayValue &&
                  "attributes__value_type_text_active"
                }`}
                htmlFor={`${this.props.attribute.name}_${item.displayValue}`}
              >
                {this.displayTextValues(item.displayValue)}
                <input
                  type="radio"
                  id={`${this.props.attribute.name}_${item.displayValue}`}
                  name={this.props.attribute.name}
                  value={item.displayValue}
                  onChange={this.handleAttributeChange}
                ></input>
              </label>
            )
          )}
        </div>
      </>
    );
  }
}

export default Attributes;
