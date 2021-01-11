import React from 'react';
import styled from '@emotion/styled';

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

export default markdownOptions;