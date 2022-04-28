import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInUser, signOutUser } from '../data/auth/firebaseSignInOut';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import logo from '../assets/MunderDifflin.png';
import signInButton from '../assets/googleSignIn.png';

export default function AppNavbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar-container'>
      <Navbar light expand='md' className='navbar'>
        <NavbarBrand href='/'>
          <img className='nav-logo' src={logo} alt='logo' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='container-fluid' navbar>
            <NavItem>
              <NavLink href='/'>
                <span className='nav-span'>Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/cart'>
                <span className='nav-span'>Cart</span>
              </NavLink>
            </NavItem>
            {user ? (
              <>
                <UncontrolledDropdown nav inNavbar className='user-drop'>
                  <DropdownToggle nav caret>
                    <img
                      className='user-img'
                      src={user.profilePic}
                      alt='user'
                    />
                    <span className='nav-span-user'>{user?.fullName}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink onClick={signOutUser}>Sign Out</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <button
                  type='button'
                  className='login-btn-container'
                  onClick={signInUser}
                >
                  <img className='login-btn' src={signInButton} alt='sign in' />
                </button>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
