import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    leftMenu: boolean
};

export default function Analytics({ leftMenu }: Props): React.ReactElement {
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const toggleMenu = (): void => {
    setOpenMenu(!openMenu);
  };

  return (

      <div className={`analytics__wrapper ${leftMenu ? 'ifOpenMenu' : 'ifCloseMenu'}`}>
        <button type="button" className="analytics__wrapper__header" onClick={() => toggleMenu()} data-testid="alt-analytics">
          <img src="/images/icons/chartIcon.svg" alt="Analytics" color="white" width="20px" height="20px" />
          <p>Analytics</p>
          <img
            className={`dropdownIcon ${openMenu ? 'up' : ''}`}
            src="/images/icons/dropdown.svg"
            alt="Dropdown"
            color="white"
            width="20px"
            height="20px"
          />
        </button>
        <div className={`nav__wrapper ${openMenu ? '' : 'closeNav'}`} data-testid="nav-id">
          <nav>
            <ul className="aside__nav__site__block">
              <li className="aside__nav__site__list">
                <div>
                  <Link to="/" className="aside__nav__site__link" >Charts</Link>
                </div>
              </li>
              <li className="aside__nav__site__list">
                <div>
                  <Link to="/d3" className="aside__nav__site__link">D3</Link>
                </div>
              </li>
              <li className="aside__nav__site__list">
                <div>
                  <Link to="/beautiful-dnd" className="aside__nav__site__link">Beautiful DnD</Link>
                </div>
              </li>
              <li className="aside__nav__site__list">
                <div>
                  <Link to="/custom-dnd" className="aside__nav__site__link">Custom DnD</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
  );
}
