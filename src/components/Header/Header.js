import { Component } from "react";
import "./Header.scss";
import Navigation from "./Navigation/Navigation";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import CurrenciesDropdown from "./CurrenciesDropdown/CurrenciesDropdown";
import CartOverlay from "./CartOverlay/CartOverlay";

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = { isActive: false, isCartOpen: false };
    }

  

  handleCartBtnClick = () => {
    this.setState({ isCartOpen: !this.state.isCartOpen });
  }

  render() {
    console.log(this.props)
    return (
      <header className="header">
        <Navigation categories={this.props.categories} />
        <NavLink to="/">
          <img className="logo" src={logo} alt="logo"></img>
        </NavLink>
          <div className="header__actions">
            {/* <div className="header__selected-currency">
              {this.props.currencies[0].symbol}
            </div> */}
            {/* <button className="header__currencies-btn" onClick={this.handleCurrenciesBtnClick}></button> */}
            <CurrenciesDropdown currencies={this.props.currencies} selectCurrency={this.props.selectCurrency} />
            <div className="header__cart" onClick={this.handleCartBtnClick}></div>
            
          </div>
          {this.state.isCartOpen && <CartOverlay />}
      </header>
    );
  }
}

export default Header;
