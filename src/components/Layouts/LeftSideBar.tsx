import React, { ReactElement, useState } from 'react';
import Analytics from './Analytics';

type Props = {
  children:
    | ReactElement
    | ReactElement[];
};

function LeftSideBar({ children }: Props): React.ReactElement {
  const [openLeftMenu, setOpenLeftMenu] = useState<boolean>(true);

  const toggleLeftMenu = ():void => {
    setOpenLeftMenu(!openLeftMenu);
  };

  return (
    <div className="wrapper">
      <div className="dashboard__wrapper">
        <aside className={`aside ${openLeftMenu ? '' : 'closeAside'}`}>
          <div className="aside__header">
            <h3 className={`${openLeftMenu ? 'ifOpenMenu' : 'ifCloseMenuNoVisible'}`}> Dashboard </h3>
            <button
              type="button"
              onClick={() => toggleLeftMenu()}
              className={`menu__btn   ${openLeftMenu ? '' : 'menu__btn_closed'}`}
            >
              <div className="menu__btn__line" />
              <div className="menu__btn__line" />
              <div className="menu__btn__line" />
            </button>
          </div>
          <Analytics leftMenu={openLeftMenu} />
        </aside>
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default LeftSideBar;
