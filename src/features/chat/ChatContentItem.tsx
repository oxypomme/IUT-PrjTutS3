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
    border-radius: 10px;
    min-width: 51%;
    max-width: 80%;
    height: auto;
    margin: 2px 10px;
    float: ${props => (props.isOwner ? "right" : "left")};

    & p {
        margin: 0;
    }
    &>p {
        font-size: .8rem;
        float: ${props => (props.isOwner ? "right" : "left")};
        position: relative;
        left: ${props => (props.isOwner ? "auto" : "38px")};
        right: ${props => (props.isOwner ? "38px" : "auto")};
        top: -4px;
    }
`;

const SpeechBubble = styled.div<{ isOwner?: boolean }>`
    background-color: ${props => (props.isOwner ? "var(--accent1)" : "var(--accent2)")};
    border-radius: 10px;
    height: auto;
    margin: 2px;
    padding: 10px;
    text-align: justify;
    color: #ffffff;

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
    isOwner: boolean;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContentItem = ({ onClick, message, isOwner }: PropsType) => {
    return (
        <Item isOwner={isOwner}>
            <SpeechBubble isOwner={isOwner}>
                {message?.content.text.replace(/:[a-z]*:/i, (rawEmoji) => emoji.getUnicode(rawEmoji)).split("\n").map((str, key) => <Markdown key={key} options={markdownOptions}>{str}</Markdown>)}
            </SpeechBubble>
            <p>{new Date(message?.date).toLocaleString() || <WaitingForData length={8} />}</p>
        </Item>
    );
}

export default ChatContentItem;