import { Component } from "react";
import "./CurrenciesDropdown.scss";

class CurrenciesDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      selectedCurrency: '',
    };
  }

  componentDidMount() {
    this.setState({selectedCurrency: this.props.currency})
  }

  handleChange = (event) => {
    this.setState({ selectedCurrency: event.target.value });
    this.props.selectCurrency(event.target.value);
  };

  handleCurrenciesBtnClick = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  closeDropdown = () => {
    this.setState({ isDropdownOpen: false });
  };

  render() {
    return (
      <>
        <div className="currencies-dropdown">
          <div className="currencies-dropdown__container">
            <h3
              className="currencies-dropdown__selected-currency"
              onClick={this.handleCurrenciesBtnClick}
            >
              {this.state.selectedCurrency}
            </h3>
          </div>

          <div
            className={`currencies-dropdown__options ${
              this.state.isDropdownOpen && "currencies-dropdown__options_opened"
            }`}
          >
            {this.props.currencies.map((currency) => (
              <label
                key={currency.label}
                className="currencies-dropdown__option"
                htmlFor={currency.label}
                onClick={this.closeDropdown}
              >
                {currency.symbol + currency.label}
                <input
                  type="radio"
                  id={currency.label}
                  name="currency"
                  value={currency.symbol}
                  onChange={this.handleChange}
                ></input>
              </label>
            ))}
          </div>
        </div>
        <div
          className={`currencies-dropdown__overlay ${
            this.state.isDropdownOpen && "currencies-dropdown__overlay_opened"
          }`}
          onClick={this.closeDropdown}
        ></div>
      </>
    );
  }
}

export default CurrenciesDropdown;
