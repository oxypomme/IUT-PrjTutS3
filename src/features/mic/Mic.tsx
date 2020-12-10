import React from "react";
// import Webcam from "react-webcam";
// import Select from "react-select";
import { ReactMic, ReactMicStopEvent } from 'react-mic';

export function Mic(): JSX.Element {
    const [recording, setRecording] = React.useState<boolean>();
    const [micRecords, setMicRecords] = React.useState<Array<ReactMicStopEvent>>([]);

    const onStop = React.useCallback((recordedBlob: ReactMicStopEvent) => {
        // console.log('recordedBlob is: ', recordedBlob);
        setMicRecords([...micRecords, recordedBlob as ReactMicStopEvent]);
    }, [recording, setRecording]);


    return (
        <div>
            <ReactMic
                record={recording}
                // className='sound-wave'
                onStop={onStop}
                strokeColor='magenta'
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
