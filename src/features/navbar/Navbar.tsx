import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';
import { getIsConnected, logoutAccount, setUid } from '../accounts/accountSlice';

const NavBar = styled.nav``;
const NavList = styled.ul`
    position: fixed;
    top: 0;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    height: 49px;
    z-index: 9999;
`;
const NavLogo = styled.img`
    height: 32px;
    padding: 8px 8px 0px 16px;
`;
const NavItem = styled.li<{ floatRight?: boolean }>`
    float: ${props => props.floatRight ? 'right' : 'left'};

    & > a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    
    & > a:hover {
        background-color: #111;
    }
    
    & > a.active {
        background-color: #111;
    }
`;

export const Navbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const isConnected = useSelector(getIsConnected);

    const handleLogout = async (event) => {
        event.preventDefault();
        dispatch(logoutAccount());
        //TODO: If success, history.push('/'); + message
    }

    return (
        <NavBar>
            <NavList>
                <NavItem>
                    <NavLogo src={logo} alt="logo" />
                </NavItem>
                <NavItem>
                    <NavLink exact to="/">Accueil</NavLink>
                </NavItem>
                {isConnected &&
                    <NavItem floatRight={true}>
                        <NavLink to="/profile">Mon profil</NavLink>
                    </NavItem>
                }
                {isConnected &&
                    <NavItem floatRight={true}>
                        <a href="#" onClick={handleLogout}>Déconnexion</a>
                    </NavItem>
                }
                {!isConnected &&
                    <NavItem floatRight={true}>
                        <NavLink to="/login">Connexion</NavLink>
                    </NavItem>
                }
                <NavItem>
                    <NavLink to="/camera">Test caméra</NavLink>
                </NavItem>
            </NavList>
        </NavBar>
    );
}