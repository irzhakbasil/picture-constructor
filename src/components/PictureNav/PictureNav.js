import React from "react";
import { NavLink } from "react-router-dom";
import "./PictureNav.css";

const PictureNav = props => {
  const menuItems = [
    { name: "Изображение", navName: "picture" },
    { name: "Рамы", navName: "frames" },
    { name: "Заголовок", navName: "text" },
    { name: "Цвет отпечатков", navName: "fingerprints" }
  ];

  const navItemsList = menuItems.map((item, index) => {
    let baseClass = "picture-nav ";
    let activeClass = "nav-active";
    if (index === props.activeLink) baseClass = baseClass.concat(activeClass);
    return (
      <NavLink
        key={index}
        to={item.navName}
        className={baseClass}
        onClick={() => props.switchComponent(index)}
      >
        <span>{index + 1}</span>
        <p>{item.name}</p>
      </NavLink>
    );
  });
  return <>{navItemsList}</>;
};

export default PictureNav;
