interface IMessage {
    sender: string,
    target: string,
    content: {
        text?: string,
        media?: string,
        type?: string
    },
    read: boolean,
    date: string
}

export default IMessage;