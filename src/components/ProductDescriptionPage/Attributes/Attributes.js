import { Component } from "react";
import "./Attributes.scss";

class Attributes extends Component {
  render() {
    return (
      <>
        {this.props.attributes.map((attribute, index) => (
          <div className="attributes" key={index}>
            <h3 className="attributes__name">{attribute.name}</h3>
            <div className="attributes__container">
              {attribute.items.map((item) =>
                attribute.type === "swatch" ? (
                  <div
                    key={item.id}
                    className="attributes__value"
                    style={{ backgroundColor: item.displayValue }}
                  ></div>
                ) : (
                  <div key={item.id} className="attributes__value">
                    {item.displayValue}
                  </div>
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
