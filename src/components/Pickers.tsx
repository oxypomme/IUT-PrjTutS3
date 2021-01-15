import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faFileImage, faMicrophone } from "@fortawesome/free-solid-svg-icons";

import { FrontContainer } from "./styledComponents";
import UploadFile from "../features/firestorage/UploadFile";
import UploadMicRecord from "../features/firestorage/UploadMicRecord";
import SelectGiphy from "../features/chat/SelectGiphy";

type PropsType = {
    sendAction: (media: string | Blob, type: string) => void;
}

export const ImagePicker = ({ sendAction }: PropsType) => {
    const [showUploadImage, setShowUploadImage] = React.useState(false);

    const handleImageClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadImage(true);
    }

    const handleImageSend = (event: React.SyntheticEvent, picture: string) => {
        event.preventDefault();
        setShowUploadImage(false);
        sendAction(picture, "images");
    }

    const handleImageCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadImage(false);
    }

    return (
        <span>
            <FrontContainer isShowing={showUploadImage} onClick={handleImageCancel}>
                {showUploadImage && <UploadFile onOk={handleImageSend} onCancel={handleImageCancel} />}
            </FrontContainer>
            <FontAwesomeIcon
                icon={faCameraRetro}
                size="2x"
                color={"silver"}
                tabIndex={101}
                onClick={handleImageClick}
            />
        </span>
    )
}
export const AudioPicker = ({ sendAction }: PropsType) => {
    const [showUploadMicRecord, setShowUploadMicRecord] = React.useState(false);

    const handleMicroClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadMicRecord(true);
    }

    const handleMicRecordSend = (event: React.SyntheticEvent, micRecord: Blob) => {
        event.preventDefault();
        setShowUploadMicRecord(false);
        sendAction(micRecord, "audios");
    }

    const handleMicRecordCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadMicRecord(false);
    }

    return (
        <span>
            <FrontContainer isShowing={showUploadMicRecord} onClick={handleMicRecordCancel}>
                {showUploadMicRecord && <UploadMicRecord onOk={handleMicRecordSend} onCancel={handleMicRecordCancel} />}
            </FrontContainer>
            <FontAwesomeIcon
                icon={faMicrophone}
                size="2x"
                color={"silver"}
                tabIndex={100}
                onClick={handleMicroClick}
            />
        </span>
    )
}
export const GifPicker = ({ sendAction }: PropsType) => {
    const [showUploadGiphy, setShowUploadGiphy] = React.useState(false);

    const handleGiphyClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadGiphy(true);
    }

    const handleGiphySend = (event: React.SyntheticEvent, gifLink: string) => {
        event.preventDefault();
        sendAction(gifLink, "giphy");
    }

    const handleGiphyCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShowUploadGiphy(false);
    }

    return (
        <span>
            <FrontContainer isShowing={showUploadGiphy} onClick={handleGiphyCancel}>
                <SelectGiphy onOk={handleGiphySend} onCancel={handleGiphyCancel} />
            </FrontContainer>
            <FontAwesomeIcon
                icon={faFileImage}
                size="2x"
                color={"silver"}
                tabIndex={102}
                onClick={handleGiphyClick}
            />
        </span>
    )
}