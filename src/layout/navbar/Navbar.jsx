import React from "react";
import hamburger from "../../assets/hamburgerIcon.svg";
import goPrimeIcon from "../../assets/goPrimeIcon.svg";
import companyLogo from "../../assets/companyLogo.svg";

const Navbar = () => {
  const menuItems = [
    { label: "Analytics", hasDropdown: true },
    { label: "Backtesting", hasDropdown: true },
    { label: "Options", hasDropdown: true },
    { label: "Resources", hasDropdown: true },
  ];

  return (
    <nav className="w-full flex items-center justify-between p-4 md:px-8 shadow-sm bg-white">
      {/* Logo and Search */}
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        <a href="/">
          <img
            src={companyLogo}
            className="w-32 h-8 md:w-[150px] md:h-[35px]"
            alt="companyLogo"
          />
        </a>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs md:max-w-sm">
          <img
            src="data:image/svg+xml,%3csvg width='18' height='19' viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6.5 13.5C4.68333 13.5 3.14583 12.8708 1.8875 11.6125C0.629167 10.3542 0 8.81667 0 7C0 5.18333 0.629167 3.64583 1.8875 2.3875C3.14583 1.12917 4.68333 0.5 6.5 0.5C8.31667 0.5 9.85417 1.12917 11.1125 2.3875C12.3708 3.64583 13 5.18333 13 7C13 7.73333 12.8833 8.425 12.65 9.075C12.4167 9.725 12.1 10.3 11.7 10.8L17.3 16.4C17.4833 16.5833 17.575 16.8167 17.575 17.1C17.575 17.3833 17.4833 17.6167 17.3 17.8C17.1167 17.9833 16.8833 18.075 16.6 18.075C16.3167 18.075 16.0833 17.9833 15.9 17.8L10.3 12.2C9.8 12.6 9.225 12.9167 8.575 13.15C7.925 13.3833 7.23333 13.5 6.5 13.5ZM6.5 11.5C7.75 11.5 8.8125 11.0625 9.6875 10.1875C10.5625 9.3125 11 8.25 11 7C11 5.75 10.5625 4.6875 9.6875 3.8125C8.8125 2.9375 7.75 2.5 6.5 2.5C5.25 2.5 4.1875 2.9375 3.3125 3.8125C2.4375 4.6875 2 5.75 2 7C2 8.25 2.4375 9.3125 3.3125 10.1875C4.1875 11.0625 5.25 11.5 6.5 11.5Z' fill='%23333333' /%3e%3c/svg%3e"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search Stocks , pages , IPOs"
            className="w-full bg-cyan-100 rounded-md pl-9 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Nav Items */}
      <ul className="hidden lg:flex gap-5 items-center">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 flex items-center gap-1"
          >
            {item.label}
            {item.hasDropdown && (
              <svg
                viewBox="0 0 512 512"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            )}
          </li>
        ))}

        <li>
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-blue-600 font-semibold"
          >
            <img src={goPrimeIcon} alt="go-prime" />
            Go Prime
          </a>
        </li>

        <li className="ml-1">
          <img src={hamburger} alt="menu" className="w-6 h-6 cursor-pointer" />
        </li>

        <li>
          <button className="py-1.5 px-4 text-sm text-white bg-blue-500 rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition">
            Login/Register
          </button>
        </li>
      </ul>

      {/* Hamburger on Mobile */}
      <div className="lg:hidden flex items-center gap-4">
        <img src={hamburger} alt="menu" className="w-6 h-6 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
