interface IMessage {
    sender: string,
    target: string,
    content: {
        text?: string,
        media?: string
    },
    read: boolean,
    date: string
}

export default IMessage;