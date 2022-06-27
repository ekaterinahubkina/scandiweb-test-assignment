import { Component } from "react";
import "./CurrenciesDropdown.css";

class CurrenciesDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedCurrency: this.props.currencies[0].symbol}
  }

  handleChange = (event) => {
    this.setState({selectedCurrency: event.target.value});
    this.props.selectCurrency(event.target.value);
  }


  render() {
    return (
      // <form className="dropwown" onSubmit={this.handleSubmit}>
      <select className="select" onChange={this.handleChange}>
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
