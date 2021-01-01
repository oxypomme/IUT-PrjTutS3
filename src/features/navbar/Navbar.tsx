import React from 'react';
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
    faGift,
    faBars
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from 'react-redux';
import { getIsConnected, logoutAccount } from '../accounts/accountSlice';

//TODO: RIP Mobile users
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
    top: 0;

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
const CompactableIcon = styled(FontAwesomeIcon) <{ isopened?: boolean }>`
    transform: translateX(${props => props.isopened ? "0" : "173px"});
    transition: transform 0.5s;
    right: 5px;
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

    const [openState, setOpenState] = React.useState<boolean>(false);

    const Dropdown = React.useCallback(({ icon, defaultValue, label, children }: any): JSX.Element => {
        const [isOpened, setIsOpened] = React.useState<boolean>(!!defaultValue);

        const handleDropdown = (event) => {
            event.preventDefault();

            setIsOpened(!isOpened);
            console.log(isOpened);
            setOpenState(true);
        }

        return (
            <NavItem>
                <a href="#" className={isOpened ? "active" : ""} onClick={handleDropdown}>
                    <CompactableIcon icon={icon} isopened={openState} />{label} <FontAwesomeIcon icon={isOpened ? faCaretUp : faCaretDown} />
                </a>
                <NavDropdownContainer style={{ display: isOpened ? "block" : "none" }}>
                    {children}
                </NavDropdownContainer>
            </NavItem>
        )
    }, [openState, dispatch]);

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
                    <NavLink exact to="/"><CompactableIcon icon={faHome} isopened={openState} />Accueil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/camera">Test caméra</NavLink>
                </NavItem>
                {isConnected &&
                    <Dropdown defaultValue={false} icon={faUsers} label={"NomADefinir"}>
                        <NavItem>
                            <NavLink to="/matches"><FontAwesomeIcon icon={faHeart} />Mes matchs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/surprise"><FontAwesomeIcon icon={faGift} />Tinder Surprise</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/chat"><FontAwesomeIcon icon={faCommentAlt} />Mes Conversations</NavLink>
                        </NavItem>
                    </Dropdown>
                }
                {isConnected &&
                    <NavItem>
                        <NavLink to="/profile"><CompactableIcon icon={faUser} isopened={openState} />Mon profil</NavLink>
                    </NavItem>
                }
                {isConnected &&
                    <NavItem>
                        <a href="#" onClick={handleLogout}><CompactableIcon icon={faSignOutAlt} isopened={openState} />Déconnexion</a>
                    </NavItem>
                }
                {!isConnected &&
                    <NavItem>
                        <NavLink to="/login"><CompactableIcon icon={faSignInAlt} isopened={openState} />Connexion</NavLink>
                    </NavItem>
                }
            </NavList>
        </NavBar >
    );
}