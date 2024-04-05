import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../../public/img/logo.png";

const navigation = [
  { path: "/events", label: "Мероприятии" },
  { path: "/sport-objects", label: "Спортобъекты" },
  { path: "/news", label: "Новости" },
];

function NavList({ className }) {
  return (
    <ul className={className}>
      {navigation.map((item) => (
        <Typography
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
          key={item.path}
        >
          <Link to={item.path} className="flex items-center gap-1 p-1 font-bold">
            {item.label}
          </Link>
        </Typography>
      ))}
    </ul>
  );
}

export function Navbar({ routes, action }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <MTNavbar color="transparent" className="p-3 relative">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Sport Platform" className="h-8 w-auto" />
          <span className="text-lg font-semibold ml-2">Чемпион</span>
        </Link>

        <div className="hidden lg:block">
          <NavList className="mb-4 mt-2 flex flex-col gap-2 text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6" />
        </div>

        <div className="hidden gap-2 lg:flex">
          <Link to="/sign-in">
            <Button variant="text" size="sm" color="white" fullWidth>
              Вход
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="outlined" size="sm" color="white" fullWidth>
              Регистрация
            </Button>
          </Link>
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })}
        </div>

        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto px-4 py-2 bg-white text-blue-gray-900">
          <NavList className="mb-4 mt-2 flex flex-col gap-2 text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6" />
          <Link to="/sign-in">
            <Button variant="text" size="sm" fullWidth>
              Вход
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button variant="outlined" size="sm" fullWidth>
              Регистрация
            </Button>
          </Link>
          {React.cloneElement(action, {
            className: "w-full block mt-2",
          })}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.defaultProps = {
  action: (
    <Link to="/about">
      <Button variant="outlined" size="sm">
        О нас
      </Button>
    </Link>
  ),
};

export default Navbar;
