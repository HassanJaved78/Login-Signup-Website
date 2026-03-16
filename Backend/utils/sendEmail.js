import nodemailer from "nodemailer";

// for sending real eamil use below

// export const sendEmail = async (to, OTP) => {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth : {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to,
//         subject: "Verify OTP",
//         text: `Dear user you OTP for password reset is ${OTP}`
//     })
// }

const testAccount = await nodemailer.createTestAccount();

export const sendEmail = async (to, OTP) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });


    const info = await transporter.sendMail({
        from: '"Test App" <test@example.com>',
        to,
        subject: "Verify OTP",
        text: `Dear user you OTP for password reset is ${OTP}`,
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}