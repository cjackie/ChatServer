import chai from "chai";
import chatService from "../../src/chat/ChatService";

const expect = chai.expect;

describe("Chat Service", () => {
    it("chat between two persons, and a random person", () => {
        const alice = "Alice";
        const bob = "Bob";

        chatService.send({
            message: "Hello Bob",
            sender: alice,
            receiver: bob,
        });

        chatService.send({
            message: "Hi, Alice, How are you?",
            sender: bob,
            receiver: alice
        });

        const messages = chatService.retrieveMessages(bob);
        expect(messages).length(2);

        chatService.send({
            message: "I'm good!",
            sender: alice,
            receiver: bob
        });

        const messages2 = chatService.retrieveMessages(bob, messages[1].sendingTime);
        expect(messages2).length(1);
        expect(messages2[0].message).eq("I'm good!");

        const messages3 = chatService.retrieveMessages("unknown");
        expect(messages3).length(0);
    });


});
