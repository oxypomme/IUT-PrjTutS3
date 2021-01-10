import React from 'react';
import styled from '@emotion/styled';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import { Button, HiddenLabel, TextBox, WaitingForData } from '../../components/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getCurrProfile } from '../accounts/profileSlice';
import ChatContentItem from './ChatContentItem';


const ImageProfileContainer = styled.div`
    width: 45%;
    max-width: 75px;
    margin: 0;
    margin-right: 15px;
`;

const MainContainer = styled.div`
    height:100%;
	display:flex;
	flex-direction:column;
`;

const TitleContainer = styled.div`
    display: flex;
    border-left: 8px solid var(--accent2);
    padding: 4px;
    background: var(--background2);
`;

const ContentContainer = styled.ul`
    /* display: flex; */
    /* flex-wrap: wrap-reverse; */
    /* border: 1px dashed red; */
    flex-grow:1;

    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
`;

const InputContainer = styled.div`
    display: flex;
    /* border: 1px dashed magenta; */
    padding: 4px;
    background: var(--background2);
`;

const ChatTextBox = styled(TextBox)`
    width: 100%;
`;
const ChatButton = styled(Button)`
    height: 100%;
    margin: 0 5px;
`;



type PropsType = {
    profile: IProfile;
    onClick?: (event: React.SyntheticEvent) => void;
}

const messages: IMessage[] = [
    {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    }, {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    }, {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    }, {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    },
    {
        sender: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        target: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        content: {
            text: "Ce message est trop long pour faire des tests :eyes:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 46)
    },
    {
        sender: "KDZ5DWWFccRZuUoRgm3lcrrqumB2", // billy
        target: "vzy56Iw31dNVZhqeHDqygWUSTYV2",
        content: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et quam sodales lacus lobortis egestas id sed ligula. Praesent sed augue vel tellus molestie malesuada. Vestibulum id neque sit amet risus varius venenatis. Aliquam aliquam, felis id fringilla dignissim, quam sapien ornare lorem, nec tempor nibh velit tincidunt ante. Nunc rutrum, nisl vel ullamcorper scelerisque, neque massa porttitor arcu, sit amet consectetur sapien nisi sit amet nisl. Nullam posuere vehicula risus eu ultrices. Nam erat felis, mattis eu porttitor ut, mattis id nulla. Proin tincidunt, justo in hendrerit porttitor, urna odio imperdiet tellus, ac sagittis arcu augue in massa. Proin varius diam eget congue congue.",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    }
]

console.log(messages);


const ChatContent = ({ onClick, profile }: PropsType) => {
    const currProfile = useSelector(getCurrProfile);

    return (
        <MainContainer>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <p>{profile?.name || <WaitingForData length={8} />}</p>
            </TitleContainer>
            <ContentContainer>
                {messages.map((message, index) => (
                    <ChatContentItem key={index} profile={currProfile} message={message} />
                ))}

            </ContentContainer>
            <InputContainer>
                <ChatTextBox>
                    <FontAwesomeIcon icon={faComments} />
                    <input
                        type='text'
                        name='message'
                        placeholder='Message'
                    />
                    <HiddenLabel htmlFor='message'>
                        Message
                    </HiddenLabel>
                </ChatTextBox>
                <ChatButton
                    primary
                // onClick={handleOnSubmit}
                >
                    Envoyer
                </ChatButton>
            </InputContainer>
        </MainContainer>
    );
}

export default ChatContent;