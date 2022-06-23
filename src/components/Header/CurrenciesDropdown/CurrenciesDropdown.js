import { Component } from "react";
import "./CurrenciesDropdown.css";

class CurrenciesDropdown extends Component {
  render() {
    return (
      // <form className="dropwown" onSubmit={this.handleSubmit}>
      <select className="select">
        {this.props.currencies.map((item) => (
          <option value={item.symbol}>{item.symbol}</option>
        ))}
        {/* <option value="grapefruit">Грейпфрут</option>
            <option value="lime">Лайм</option>
            <option value="coconut">Кокос</option>
            <option value="mango">Манго</option> */}
      </select>
      //   </form>
    );
  }
}

export default CurrenciesDropdown;
