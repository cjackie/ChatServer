import _ from "lodash";

interface ChatMessage {
    message: String;
    sender: String;
    receiver: String;
    sendingTime?: Number;
}

interface IChatService {
    send(message: ChatMessage): ChatMessage;
    retrieveMessages(participant: String, since: Number | undefined): ChatMessage[];
}

class InMemoryChatService implements IChatService {
    messages: ChatMessage[];
    constructor() {
        this.messages = [];
    }

    /**
     *
     * @param {ChatMessage} message
     * @returns {boolean}
     */
    send(message: ChatMessage): ChatMessage {
        const copy: ChatMessage = _.cloneDeep(message);

        if (!copy.sendingTime)
            copy.sendingTime = new Date().getTime();

        this.messages.push(copy);
        return _.cloneDeep(copy);
    }

    /**
     *
     * @param {String} participant
     * @param {Number | undefined} since getting all messages when it is under
     * @returns {ChatMessage[]}
     */
    retrieveMessages(participant: String, since?: Number): ChatMessage[] {
        if (!since)
            since = 0;

        const data: ChatMessage[] = [];
        _.each(this.messages, (message: ChatMessage) => {
            if ((message.receiver === participant || message.sender === participant) && message.sendingTime > since) {
                data.push(message);
            }
        });

        return data;
    }
}

const chatService = new InMemoryChatService();

export default chatService;
