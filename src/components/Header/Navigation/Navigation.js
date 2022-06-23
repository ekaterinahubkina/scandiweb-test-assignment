import { Component } from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

class Navigation extends Component {
  render() {
    const linkClassName = ({ isActive }) => {
      return `navigation__link ${isActive && "navigation__link_active"}`;
    };
    return (
      <ul className="navigation">
        {this.props.categories.map((category) => (
          <li className="navigation__category" key={category.name}>
            <NavLink className={linkClassName} to={`/${category.name}`}>
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default Navigation;
