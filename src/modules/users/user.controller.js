import { UserService } from "./user.service.js";

export const signup = async (req, res) => {
    try {

        const { name, password } = req.body;

        const accountNumber = Math.floor(Math.random() * 900000) + 100000;

        const user = await UserService.create({
            name,
            password,
            accountNumber
        });

        res.status(201).json({
            status: "success",
            message: "User created successfully! 🥳",
            data: user
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

export const login = async (req, res) => {
    try {

        const { accountNumber, password } = req.body;

        const user = await UserService.login({
            accountNumber,
            password
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Account Number or Password not valid! ☹️",
            });
        }

        res.status(200).json({
            status: "success",
            message: "User logged in successfully! 🥳",
            data: user
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

export const getHistory = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await UserService.getHistory(id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found! ☹️",
            });
        }

        res.status(200).json({
            status: "success",
            message: "User history fetched successfully! 🥳",
            data: user
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
