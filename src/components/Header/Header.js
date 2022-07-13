import { Component } from "react";
import "./Header.scss";
import Navigation from "./Navigation/Navigation";
import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import CurrenciesDropdown from "./CurrenciesDropdown/CurrenciesDropdown";

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = { isCartOpen: false };
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
            <CurrenciesDropdown currencies={this.props.currencies} selectCurrency={this.props.selectCurrency} />
            <div className="header__cart" onClick={this.props.onCartIconClick}></div>
            
          </div>
          {/* {this.state.isCartOpen && <CartOverlay />} */}
      </header>
    );
  }
}

export default Header;
