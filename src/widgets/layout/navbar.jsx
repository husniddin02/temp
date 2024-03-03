import React from "react";
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

export function Navbar({ routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="inherit" className="capitalize">
        <Link to="/events" className="flex items-center gap-1 p-1 font-bold">
          Мероприятии
        </Link>
      </Typography>

      <Typography as="li" variant="small" color="inherit" className="capitalize">
        <Link to="/objects" className="flex items-center gap-1 p-1 font-bold">
          Спортобъекты
        </Link>
      </Typography>

      <Typography as="li" variant="small" color="inherit" className="capitalize">
        <Link to="/news" className="flex items-center gap-1 p-1 font-bold">
          Новости
        </Link>
      </Typography>
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Sport Platform" className="h-8 w-auto" />
          <span className="text-lg font-semibold ml-2">Sport Platform</span>
        </Link>

        <div className="hidden lg:block">{navList}</div>

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
          {navList}
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
