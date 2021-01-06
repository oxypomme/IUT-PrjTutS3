import React from 'react';
import styled from '@emotion/styled';
import { NavLink, useHistory } from 'react-router-dom';
import { InferProps } from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

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
    faGift,
    faBars
} from "@fortawesome/free-solid-svg-icons";

import { getIsConnected, logoutAccount } from '../accounts/accountSlice';

import logo from '../../logo.svg';
import { Separator } from '../../components/styledComponents';

const NavBar = styled.nav<{ isopened?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 225px;
    overflow: auto;
    margin: 0;
    padding: 0;
    background-color: #333;
    z-index: 9999;
    transform: translateX(${props => props.isopened ? "0" : "-175px"});
    transition: transform 0.5s;
`;

const NavList = styled.ul`
    list-style-type: none;
    margin: 0 0 5px 0;
    padding: 0;
    height: 50px;

    & > li:nth-of-type(3){
        margin-top: 50px;
    }
`;
const NavButton = styled.a<{ isopened?: boolean }>`
    width: fit-content;
    position: absolute;
    right: 0;
    top: 1px;

    & > svg{
        transform: rotate(${props => props.isopened ? "-90deg" : "0"});
        transition: transform 0.5s;
    }
`;
const NavLogo = styled.img`
    height: 32px;
    padding: 10px 12px;
    position: absolute;
    left: 0;
    top: 0;
`;
const NavItem = styled.li`
    & > a:hover {
        background-color: #111;
    }

    & > a {
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
const CompactableIcon = styled(FontAwesomeIcon) <{ isopened?: string }>`
    transform: translateX(${props => props.isopened == "true" ? "0" : "173px"});
    transition: transform 0.5s;
    right: 5px;
`;

const CompactableSeparator = styled(Separator) <{ isopened?: string }>`
    transform: translateX(${props => props.isopened == "true" ? "0" : "85px"});
    width: ${props => props.isopened == "true" ? "65%" : "24px"};
    transition: transform 0.5s, width 0.5s;
`;

export const Navbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isConnected = useSelector(getIsConnected);
    const alert = useAlert();

    const [openState, setOpenState] = React.useState<boolean>(false);

    const handleLogout = async (event) => {
        event.preventDefault();

        dispatch(
            logoutAccount(({ error }) => {
                if (error) {
                    alert.error(error.message);
                }
                else {
                    alert.success('Vous êtes déconnecté')
                    history.push('/');
                }
            })
        );
    }

    const handleOpening = async (event) => {
        event.preventDefault();
        setOpenState(!openState);
    }

    return (
        <NavBar isopened={openState}>
            <NavList>
                <NavItem>
                    <NavButton href="#" onClick={handleOpening} isopened={openState}><FontAwesomeIcon icon={faBars} /></NavButton>
                </NavItem>
                <NavItem>
                    <NavLogo src={logo} alt="logo" />
                </NavItem>
                <NavItem>
                    <NavLink exact to="/"><CompactableIcon icon={faHome} isopened={openState.toString()} />Accueil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/camera">Test caméra</NavLink>
                </NavItem>
                {isConnected &&
                    <div>
                        <CompactableSeparator isopened={openState.toString()} />
                        <NavItem>
                            <NavLink to="/matches"><CompactableIcon icon={faHeart} isopened={openState.toString()} />Mes matchs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/surprise"><CompactableIcon icon={faGift} isopened={openState.toString()} />Tinder Surprise</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/chat"><CompactableIcon icon={faCommentAlt} isopened={openState.toString()} />Mes Conversations</NavLink>
                        </NavItem>
                        <CompactableSeparator isopened={openState.toString()} />
                        <NavItem>
                            <NavLink to="/profile"><CompactableIcon icon={faUser} isopened={openState.toString()} />Mon profil</NavLink>
                        </NavItem>
                        <NavItem>
                            <a href="#" onClick={handleLogout}><CompactableIcon icon={faSignOutAlt} isopened={openState.toString()} />Déconnexion</a>
                        </NavItem>
                    </div>
                }
            </NavList>
        </NavBar >
    );
}