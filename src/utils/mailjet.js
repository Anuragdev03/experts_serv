import Mailjet from 'node-mailjet';
import { envVar } from './constants.js';

const mailjet = Mailjet.apiConnect(
    envVar.mailjetPublic,
    envVar.mailjetPrivate
);

export async function sendEmail(sender, senderName, receiverMail, receiverName, subject, text, html) {

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: sender,
                    Name: senderName,
                },
                To: [
                    {
                        Email: receiverMail,
                        Name: receiverName,
                    },
                ],
                Subject: subject,
                TextPart: text,
                HTMLPart: html
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body)
            return result.body
        })
        .catch(err => {
            console.log(err.statusCode)
            return err
        })
}

export async function forgotPasswordEmail(sender, senderName, receiverMail, receiverName, subject, otp) {

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: sender,
                    Name: senderName,
                },
                To: [
                    {
                        Email: receiverMail,
                        Name: receiverName,
                    },
                ],
                Subject: subject,
                TemplateID: 6672713,
                Variables: {
                    otp: otp
                }
            },
        ],
    })
    request
        .then(result => {
            console.log(result.body?.Messages[0].To[0])
            return result.body
        })
        .catch(err => {
            console.log(err.statusCode)
            return err
        })
}