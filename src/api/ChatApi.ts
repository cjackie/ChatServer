import { NextFunction, Request, Response } from "express";

import chatService from "../chat/ChatService";
import { ValidationBuilder } from "../util/validator";

/**
 *
 * @param {e.Request} req {sender, receiver, message}
 * @param {e.Response} res {errors?, sendingTime?}
 */
const sendMessage = (req: Request, res: Response) => {
    const validationBuilder: ValidationBuilder = new ValidationBuilder(req);

    validationBuilder.body("sender", (value: string) => value && value.length > 0, "sender is required");
    validationBuilder.body("receiver", (value: string) => value && value.length > 0, "receiver is required.");
    validationBuilder.body("message", (value: string) => value && value.length > 0, "message is required.");

    const errors = validationBuilder.validate().errors;
    if (errors) {
        res.send({
            errors: errors
        });

        return;
    }

    const chatMessage = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message
    };

    const ret = chatService.send(chatMessage);
    res.send({
        sendingTime: ret.sendingTime
    });
};

/**
 *
 * @param {e.Request} req {participant, since?}
 * @param {e.Response} res {errors?, messages?:}
 */
const fetchMessages = (req: Request, res: Response) => {
    const validationBuilder: ValidationBuilder = new ValidationBuilder(req);
    validationBuilder.query("participant", (value: string) => value && value.length > 0, "participant is required.");
    validationBuilder.query("since", (value: any) => !value || typeof value === "number", "since is invalid");
    const errors = validationBuilder.validate().errors;
    if (errors && errors.length !== 0) {
        res.send({
            errors: errors
        });
        return;
    }

    const messages = chatService.retrieveMessages(req.query["participant"], req.query["since"]);
    res.send({
        messages: messages
    });
};

export default { sendMessage, fetchMessages };