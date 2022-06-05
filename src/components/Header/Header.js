import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { isActive: false };
  //   }

  handleCategoryBtnClick() {
    this.setState({ isActive: true });
  }

  render() {
    const linkClassName = ({ isActive }) => {
      return `header__link ${isActive && "header__link_active"}`;
    };
    return (
      <header className="header">
        <ul className="header__categories-list">
          {this.props.categories.map((category) => (
            <li className="header__category" key={category.name}>
              <NavLink className={linkClassName} to={`/${category.name}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </header>
    );
  }
}

export default Header;
