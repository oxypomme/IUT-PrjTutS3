import React from "react";
import styled from '@emotion/styled';

import { ReactMic, ReactMicStopEvent } from 'react-mic';

export const MicCircle = styled(ReactMic) <{ backgroundColor?: string, strokeColor?: string }>`
  width: 100px;
  height: 50px;
  border: 1px solid ${props => props.strokeColor};
  border-radius: 5%;
  padding: 0;
  margin: 8px;
  background-color: ${props => props.backgroundColor};
`;


export function Mic(): JSX.Element {
    const [recording, setRecording] = React.useState<boolean>();
    const [micRecords, setMicRecords] = React.useState<Array<ReactMicStopEvent>>([]);

    const onStop = React.useCallback((recordedBlob: ReactMicStopEvent) => {
        // console.log('recordedBlob is: ', recordedBlob);
        setMicRecords([...micRecords, recordedBlob]);
    }, [recording, setRecording]);


    return (
        <div>
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
            <button onClick={() => setRecording(!recording)} type='button'>{recording ? 'Stop' : 'Start'}</button>
            {micRecords.map((record, index) => (
                <div key={index}>
                    <video controls src={record.blobURL} style={{ height: '60px', width: '300px' }} />
                    <p style={{ display: 'inline-block' }}>Audio n°{index} : {record.blob.size}o</p>
                </div>
            ))}
        </div>
    );
}
