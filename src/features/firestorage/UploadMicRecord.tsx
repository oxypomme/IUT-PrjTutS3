import React from 'react';
import styled from '@emotion/styled';
import { ReactMic, ReactMicStopEvent } from 'react-mic';

import { AudioElement, Button, ButtonFlex } from '../../components/styledComponents';

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
    height: 200px;
    margin: 5px;

    & > * {
        padding: 10px;
    }
`;

const StyledButtonFlex = styled(ButtonFlex)`
    & > * {
        width: 220px;
    }
`;

const MicCircle = styled(ReactMic) <{ backgroundColor?: string, strokeColor?: string }>`
  width: 440px;
  height: 50px;
  border: 1px solid ${props => props.strokeColor};
  border-radius: 5%;
  padding: 0;
  margin: 8px;
  background-color: ${props => props.backgroundColor};
`;

const RecButton = styled(Button) <{ isRecording?: boolean }>`
    width: 100%;

    ${props => props.isRecording ? "border: 1px solid var(--accent1);" : ''}
    ${props => props.isRecording ? "color: 'var(--accent1)';" : ''}
    ${props => props.isRecording ? "background: var(--background2);}" : ''}
`;

type PropsType = {
    onCancel?: (event: React.SyntheticEvent) => void;
    onOk?: (event: React.SyntheticEvent, micRecord: Blob) => void;
}

const UploadMicRecord = ({ onCancel, onOk }: PropsType) => {

    const [recording, setRecording] = React.useState<boolean>();
    const [micRecord, setMicRecord] = React.useState<ReactMicStopEvent>(undefined);

    const onNOk = (event: React.SyntheticEvent) => {
        setMicRecord(undefined);
        onCancel(event);
    }

    const handleOk = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onOk(event, micRecord.blob);
    }

    const onStop = React.useCallback((recordedBlob: ReactMicStopEvent) => {
        setMicRecord(recordedBlob);
    }, [recording, setRecording]);

    const handleRecord = (event) => {
        event.preventDefault();
        setRecording(!recording);
    }

    return (
        <Container>
            <ImageContainer>
                <MicCircle
                    record={recording}
                    onStop={onStop}
                    echoCancellation={false}
                    autoGainControl={false}
                    noiseSuppression={false}
                    channelCount={2}
                    visualSetting="sinewave" // sinewave or frequencyBars
                    mimeType="audio/webm"
                    strokeColor='var(--accent2)'
                    backgroundColor='#bbbbbb'
                />
                <RecButton onClick={handleRecord} isRecording={recording}>{recording ? 'Arrêter l\'enregistrement' : 'Commencer à enregistrer'}</RecButton>
                {micRecord &&
                    <AudioElement controls src={micRecord?.blobURL} />
                }
            </ImageContainer>
            <StyledButtonFlex>
                {onCancel ? <Button onClick={onNOk}>Annuler</Button> : <></>}
                {onOk ? <Button primary onClick={handleOk}>Envoyer</Button> : <></>}
            </StyledButtonFlex>
        </Container>
    );
}

export default UploadMicRecord;