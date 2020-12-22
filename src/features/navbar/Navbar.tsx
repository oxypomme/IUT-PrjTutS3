import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../logo.svg';

import styled from '@emotion/styled';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faSignOutAlt,
    faHeart,
    faHome,
    faCommentAlt,
    faSignInAlt,
    faCaretDown,
    faCaretUp,
    faUsers,
    faGift
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from 'react-redux';
import { getIsConnected, logoutAccount } from '../accounts/accountSlice';

//TODO: RIP Mobile users
const NavBar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 16%;
    min-width: 205px;
    overflow: auto;
    margin: 0;
    padding: 0;
    background-color: #333;
    z-index: 9999;
`;
const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
`;
const NavLogo = styled.img`
    height: 32px;
`;
const NavItem = styled.li<{ stickToBottom?: boolean }>`
    /*TODO: stick to bottom*/

    &:hover {
        background-color: #111;
    }

    & > a, & > button {
        display: block;
        color: white;
        text-align: left;
        padding: 14px 16px;
        text-decoration: none;
    }
    
    & > a.active {
        background-color: #111;
    }

    & svg {
        margin-right: 5px;
    }
`;
const NavDropdownContainer = styled.ul`
    list-style-type: none;
    padding: 0;
    display: none;
    background-color: #262626;

    & > li {
        padding-left: 16px;
    }
`;

export const Navbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isConnected = useSelector(getIsConnected);
    //TODO: support for multiple dropdown
    const [dropdownArrow, setDropdownArrow] = useState(faCaretDown);

    const onUnlogged = ({ error, cancelled, data }) => {
        if (error) {
            alert("ERREUR : " + error.message);
        }
        else {
            alert('Vous êtes déconnecté.')
            history.push('/');
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault();

        dispatch({
            type: logoutAccount.type,
            payload: {
                request: {
                    type: "signOut"
                },
            },
            onComplete: onUnlogged
        });
    }

    const handleDropdown = (event) => {
        event.preventDefault();
        event.target.classList.toggle("active");
        setDropdownArrow(dropdownArrow == faCaretDown ? faCaretUp : faCaretDown);

        const container = event.target.nextElementSibling;

        if (container == null) {
            return;
        }
        if (container.style.display === "block") {
            container.style.display = "none";
        } else {
            container.style.display = "block";
        }
    }

    return (
        <NavBar>
            <NavList>
                <NavItem>
                    <NavLogo src={logo} alt="logo" />
                </NavItem>
                <NavItem>
                    <NavLink exact to="/"><FontAwesomeIcon icon={faHome} />Accueil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/camera">Test caméra</NavLink>
                </NavItem>
                {isConnected &&
                    <NavItem>
                        <a href="#" onClick={handleDropdown}>
                            <FontAwesomeIcon icon={faUsers} />NomADefinir <FontAwesomeIcon icon={dropdownArrow} />
                        </a>
                        <NavDropdownContainer>
                            <NavItem>
                                <NavLink to="/TODO"><FontAwesomeIcon icon={faHeart} />Mes matchs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/surprise"><FontAwesomeIcon icon={faGift} />Tinder Surprise</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/chat"><FontAwesomeIcon icon={faCommentAlt} />Mes Conversations</NavLink>
                            </NavItem>
                        </NavDropdownContainer>
                    </NavItem>
                }
                {isConnected &&
                    <NavItem stickToBottom={true}>
                        <NavLink to="/profile"><FontAwesomeIcon icon={faUser} />Mon profil</NavLink>
                    </NavItem>
                }
                {isConnected &&
                    <NavItem stickToBottom={true}>
                        <a href="#" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} />Déconnexion</a>
                    </NavItem>
                }
                {!isConnected &&
                    <NavItem stickToBottom={true}>
                        <NavLink to="/login"><FontAwesomeIcon icon={faSignInAlt} />Connexion</NavLink>
                    </NavItem>
                }
            </NavList>
        </NavBar >
    );
}