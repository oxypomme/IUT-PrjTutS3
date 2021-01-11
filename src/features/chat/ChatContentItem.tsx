import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'markdown-to-jsx';
import emoji from 'emoji-dictionary';

import { WaitingForData } from '../../components/styledComponents';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';

import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';

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

const Bold = styled.span`
    font-weight: bold;
`;
const Italic = styled.span`
    font-style: italic;
`;
const Quote = styled.blockquote`
    margin: 0;
    padding: 0 20px;
    border-left: 5px solid gray;
`;
const Default = ({ children }: any) => (
    <p>{children}</p>
);
const Code = styled.code`
    background-color: rgba(50,50,50,0.5);
    padding: 2px;
    border-radius: 5px;
`;
const ImgOverride = ({ alt, src }: any) => (
    <span>![{alt}]({src})</span>
);
const LinkOverride = ({ children, href, title }: any) => (
    <span>[{children}]({href}{title ? ' "' + title + '"' : ''})</span>
)

const markdownOptions = {
    forceBlock: true,
    disableParsingRawHTML: true,
    overrides: {
        strong: Bold,
        em: Italic,
        h1: Default,
        h2: Default,
        h3: Default,
        h4: Default,
        h5: Default,
        h6: Default,
        blockquote: Quote,
        code: Code,
        img: ImgOverride,
        a: LinkOverride,
    }
}

type PropsType = {
    message: IMessage;
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const ChatContentItem = ({ onClick, profile, message }: PropsType) => {
    return (
        <Item isOwner={profile?.authId === message?.sender}>
            <Markdown options={markdownOptions}>{message?.content.text.replace(/:[a-z]*:/i, (rawEmoji) => emoji.getUnicode(rawEmoji))}</Markdown >
        </Item>
    );
}

export default ChatContentItem;