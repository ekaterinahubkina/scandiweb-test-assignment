import { Component } from "react";
import { displayTextValues } from "../../../utils/utils";
import './SelectedAttributes.scss';

class SelectedAttributes extends Component {
  render() {
    const classNames = this.props.classNames;

    return (

      <>
        <p className={classNames.attributeName}>
          {this.props.attribute.name}:
        </p>
        <div className={classNames.attributeItemsContainer}>
          {this.props.attribute.items.map((item) =>
            this.props.attribute.type === "swatch" ? (
              <div
                key={item.id}
                className={this.props.activeClassName(
                  item,
                  this.props.attribute,
                  classNames.attributeSwatch
                )}
                style={{ backgroundColor: item.displayValue }}
              ></div>
            ) : (
              <div
                key={item.id}
                className={this.props.activeClassName(
                  item,
                  this.props.attribute,
                  classNames.attributeText
                )}
              >
                {displayTextValues(item.displayValue)}
              </div>
            )
          )}
        </div>
      </>
    );
  }
}
export default SelectedAttributes;
