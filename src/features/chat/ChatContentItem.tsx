import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'markdown-to-jsx';
import emoji from 'emoji-dictionary';
import { useSelector } from 'react-redux';

import markdownOptions from './MarkdownOverride';

import { WaitingForData } from '../../components/styledComponents';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';

import { getCurrProfile } from '../accounts/profileSlice';

const Item = styled.li<{ isOwner?: boolean }>`
    background-color: ${props => (props.isOwner ? "var(--accent1)" : "var(--accent2)")};
    border-radius: 10px;
    min-width: 51%;
    max-width: 80%;
    height: auto;
    margin: 10px;
    float: ${props => (props.isOwner ? "right" : "left")};
    padding: 10px;
    text-align: justify;
    color: #ffffff;

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
        border-right: ${props => (props.isOwner ? "0" : "auto")};
        border-left: ${props => (props.isOwner ? "auto" : "0")};
    }
`;

type PropsType = {
    message: IMessage;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContentItem = ({ onClick, message }: PropsType) => {
    const currProfile = useSelector(getCurrProfile);
    return (
        <Item isOwner={currProfile?.authId === message?.sender}>
            {message?.content.text.replace(/:[a-z]*:/i, (rawEmoji) => emoji.getUnicode(rawEmoji)).split("\n").map((str, key) => <Markdown key={key} options={markdownOptions}>{str}</Markdown>)}
        </Item>
    );
}

export default ChatContentItem;