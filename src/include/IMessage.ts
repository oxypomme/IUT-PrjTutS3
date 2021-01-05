interface IMessage {
    sender: string,
    target: string,
    content: {
        text?: string,
        media?: string
    },
    date: string | Date // type to define with firebase
}

export default IMessage;