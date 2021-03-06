import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'markdown-to-jsx';
import emoji from 'emoji-dictionary';
import { useSelector } from 'react-redux';

import markdownOptions from './MarkdownOverride';

import { AudioElement, WaitingForData } from '../../components/styledComponents';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';

import { getCurrProfile } from '../accounts/profileSlice';


const Item = styled.li<{ isOwner?: boolean }>`
    border-radius: 10px;
    width: 100%;
    height: fit-content;
    position: relative;
    margin: 20px 0 0 0;

    & p {
        margin: 0;
    }
    & > p {
        font-size: .8rem;
        text-align: ${props => (props.isOwner ? "right" : "left")};
        position: absolute;
        bottom: -15px;
        ${props => (props.isOwner ? "right" : "left")}: 45px;
    }
`;

const SpeechBubble = styled.div<{ isOwner?: boolean }>`
    background-color: ${props => (props.isOwner ? "var(--accent1)" : "var(--accent2)")};
    float: ${props => (props.isOwner ? "right" : "left")};
    border-radius: 10px;
    height: fit-content;
    min-width: 30px;
    width: fit-content;
    padding: 10px;
    text-align: justify;
    color: #ffffff;
    margin: 0 10px;

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

const ChatImage = styled.img`
    max-width: 200px;
    max-height: 200px;
    margin: 10px 10px -10px 10px;
    border-radius: 5px;
    cursor: pointer;
`;

type PropsType = {
    message: IMessage;
    isOwner: boolean;
    onImageClick?: (link: string) => void;
}

const ChatContentItem = ({ onImageClick, message, isOwner }: PropsType) => {
    return (
        <Item isOwner={isOwner}>
            <SpeechBubble isOwner={isOwner}>
                {message?.content.text?.replace(/:[a-z]*:/i, (rawEmoji) => emoji.getUnicode(rawEmoji)).split("\n").map((str, key) => <Markdown key={key} options={markdownOptions}>{str}</Markdown>)}
                {(message?.content.type === "images" || message?.content.type === "giphy") && typeof message?.content.media === "string" &&
                    <ChatImage src={message?.content.media} alt="Image" onClick={() => onImageClick(message?.content.media as string)} />
                }
                {message?.content.type === "audios" && typeof message?.content.media === "string" &&
                    <AudioElement controls src={message?.content.media} />
                }
                <p></p> {/* BUG fix style*/}
            </SpeechBubble>
            <p>{message?.date || <WaitingForData length={8} />}</p>
        </Item>
    );
}

export default ChatContentItem;