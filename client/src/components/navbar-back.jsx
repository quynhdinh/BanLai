import React from 'react';
import {Link, Navbar, NavLeft, Icon, NavTitle} from 'zmp-framework/react';

const NavbarBack = ({title, linkLeft}) => {
  return (
    <Navbar>
      <NavLeft displayName="zmp-navleft">
        <Link className="no-ripple" noLinkClass animate={false} href={linkLeft}>
          <Icon zmp="zi-arrow-left"/>
        </Link>
      </NavLeft>
      <NavTitle>{title}</NavTitle>
    </Navbar>
  )
}

NavbarBack.displayName = 'zmp-navbar';

export default NavbarBack;
