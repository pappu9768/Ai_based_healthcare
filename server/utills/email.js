import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env.EMAIL_ID)



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const sendMailForVerification = async (userEmail, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: userEmail,
            subject: "Verify your account!!",
            html: `
                <div style = "text-align:center;">
                    <h2 style="color:#111;">Your Healthcare Account Verification Code</h2>

                    <p style="color:#555;">Please use the OTP below to verify your Healthcare account.</p>

                    <p style="width:150px; margin:20px auto; padding:15px 25px; border:2.5px solid #000; font-size:20px; font-weight:bold; background:#fff; letter-spacing:5px">
                        ${otp}
                    </p>

                    <p style="color: #999; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, please ignore this email.</p>
                </div>
            `
        }

        await transporter.sendMail(mailOptions);
        console.log("Email send successfully")
    } catch (err) {
        console.error("Error found while sending mail", err)
        throw err
    }
}