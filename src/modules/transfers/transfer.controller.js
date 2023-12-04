import { UserService } from "../users/user.service.js";
import { TransferService } from "./transfer.service.js";


export const makeTransfer = async (req, res) => {

    try {

        const { amount, recipientAccountNumber, senderAccountnumber } = req.body;

        const recipientUserPromise = await UserService.findOneAccount(recipientAccountNumber);
        const senderUserPromise = await UserService.findOneAccount(senderAccountnumber);

        const [recipientUser, senderUser] = await Promise.all([
            recipientUserPromise,
            senderUserPromise
        ]);

        if (!recipientUser) {
            return res.status(404).json({
                status: "error",
                message: "Recipient account not found! 😖"
            });
        }

        if (!senderUser) {
            return res.status(404).json({
                status: "error",
                message: "Sender account not found! 😖"
            });
        }

        if (amount > senderUser.amount) {
            return res.status(400).json({
                status: "error",
                message: "Insufficient funds! 😖"
            });
        }

        const newRecipientAmount = amount + recipientUser.amount;
        const newSenderAmount = senderUser.amount - amount;

        const updateRecipientUPromise = UserService.updateAmount(recipientUser, newRecipientAmount);
        const updateSenderUserPromise = UserService.updateAmount(senderUser, newSenderAmount);
        const transferPromise = TransferService.createRecordTransfer(amount, senderUser.id, recipientUser.id);

        await Promise.all([
            updateRecipientUPromise,
            updateSenderUserPromise,
            transferPromise
        ]);

        res.status(201).json({
            status: "success",
            message: "Transfer created successfully!",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: "fail",
            message: "Something went wrong! ☹️",
            error
        });
    }
};