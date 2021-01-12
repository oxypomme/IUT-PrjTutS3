interface IMessage {
    sender: string,
    target: string,
    content: {
        text?: string,
        media?: string | Blob,
        type?: string
    },
    read: boolean,
    date: string
}

export default IMessage;