import React from 'react';
import styled from '@emotion/styled';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import { WaitingForData } from '../../components/styledComponents';

const Item = styled.li<{ isOwner?: boolean }>`
    background-color: ${props => (props.isOwner ? "var(--accent1)" : "var(--accent2)")};
    border-radius: 10px;
    max-width: 80%;
    height: auto;
    margin: 10px;
    float: ${props => (props.isOwner ? "right" : "left")};
    padding: 10px;
    text-align: justify;

    &>p {
        margin: 0;
    }

    &:after {
	    content: '';
        position: relative;
        top: 45px;
        left: ${props => (props.isOwner ? "calc(100% - 25px)" : "10px")};
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-top-color: ${props => (props.isOwner ? "var(--accent1)" : "var(--accent2)")};
        /* border-bottom: 0; */
        border-right: ${props => (props.isOwner ? "0" : "auto")};
        border-left: ${props => (props.isOwner ? "auto" : "0")};
    }
`;



type PropsType = {
    message: IMessage;
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContentItem = ({ onClick, profile, message }: PropsType) => {
    return (
        <Item isOwner={profile?.authId === message?.sender}>
            <p>{message?.content.text}</p>
        </Item>
    );
}

export default ChatContentItem;