import React from 'react';
import styled from '@emotion/styled';
import ReactGiphySearchbox from "react-giphy-searchbox";

import { Button, ButtonFlex } from '../../components/styledComponents';
import { ProfilePicture as Picture } from '../accounts/profile/ProfileComponent';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    padding: 5px;
    overflow: hidden;

    background: var(--background2);
    border-radius: 10px;

    & > * {
        margin: auto;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 650px;
    margin: 5px;

    & > * {
        padding: 10px;
    }

    & > img {
        padding: 0;
        width: 300px;
        margin: 10px auto;
    }
`;

const StyledButtonFlex = styled(ButtonFlex)`
    & > * {
        width: 220px;
    }
`;

type PropsType = {
    onCancel?: (event: React.SyntheticEvent) => void;
    onOk?: (event: React.SyntheticEvent, gifLink: string) => void;
}

const handleStopPropagation = (event) => {
    event.stopPropagation();
}

const SelectGiphy = ({ onCancel, onOk }: PropsType) => {
    const [gifLink, setGifLink] = React.useState<string>(undefined);

    const onNOk = (event: React.SyntheticEvent) => {
        setGifLink(undefined);
        onCancel(event);
    }

    const handleOk = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onOk(event, gifLink);
    }


    const handleSelect = (event) => {
        setGifLink(event.images.downsized.url)
    }

    return (
        <Container onClick={handleStopPropagation}>
            <ImageContainer>
                <ReactGiphySearchbox
                    apiKey="9Ixlv3DWC1biJRI57RanyL7RTbfzz0o7"
                    onSelect={handleSelect}
                    poweredByGiphy={true}
                    masonryConfig={[
                        { columns: 3, imageWidth: 200, gutter: 4 },
                    ]}

                />
                <Picture source={gifLink} />
            </ImageContainer>
            <StyledButtonFlex>
                {onCancel && <Button onClick={onNOk}>Annuler</Button>}
                {onOk && gifLink && <Button primary onClick={handleOk}>Envoyer</Button>}
            </StyledButtonFlex>
        </Container>
    );
}

export default SelectGiphy;