import React from 'react';
import styled from '@emotion/styled';
import { ProfilePicture } from '../accounts/profile/ProfileComponent';
import IProfile from '../../include/IProfile';
import IMessage from '../../include/IMessage';
import { Button, HiddenLabel, TextBox, WaitingForData } from '../../components/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';


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

const ContentContainer = styled.div`
    display: flex;
    /* border: 1px dashed red; */
    flex-grow:1;
`;

const InputContainer = styled.div`
    display: flex;
    /* border: 1px dashed magenta; */
    padding: 4px;
    background: var(--background2);
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
            text: "Ce message est trop long pour faire des tests :wink:",
            media: ""
        },
        read: true,
        date: new Date(2021, 0, 8, 15, 28, 47)
    }
]

const ChatContent = ({ onClick, profile }: PropsType) => {
    return (
        <MainContainer>
            <TitleContainer>
                <ImageProfileContainer>
                    <ProfilePicture source={profile.imageURL} />
                </ImageProfileContainer>
                <p>{profile?.name || <WaitingForData length={8} />}</p>
            </TitleContainer>
            <ContentContainer>
            </ContentContainer>
            <InputContainer>
                <TextBox>
                    <FontAwesomeIcon icon={faComments} />
                    <input
                        type='text'
                        name='message'
                        placeholder='Message'
                    />
                    <HiddenLabel htmlFor='message'>
                        Message
                    </HiddenLabel>
                </TextBox>
                <Button
                    primary
                // onClick={handleOnSubmit}
                >
                    Envoyer
                </Button>
            </InputContainer>
        </MainContainer>
    );
}

export default ChatContent;