const nodemailer = require("nodemailer");
const Tutor = require("../models/Tutor");
const User = require("../models/User");

const sendemailController = async (req, res) => {
    try {
        const tutorId = req.params.tutorId;
        const tutor = await Tutor.findById(tutorId);

        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" });
        }
        const userId = tutor.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "outlook",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: req.body.subject,
            text: req.body.message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error in sendemailController:", error);
                res.status(500).json({
                    message: "Internal Server Error",
                    error,
                });
            } else {               
                res.status(200).json({ message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error in sendemailController:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

module.exports = sendemailController;
