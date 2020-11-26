import Email from '../model/email'
import sgMail from '@sendgrid/mail'
import { errorService } from './error'
import mongoose from "mongoose"


import { EmailInterface, SendMailInerface } from "../../../types"


class EmailService {


  public addEmail(email: string): Promise<EmailInterface> {
    let mail = new Email({ email })
    return mail.save()
  }

  public async sendEmailAll({ from, subject, text, html }: SendMailInerface): Promise<any> {
    let mails = await this.getEmails()
    let emails = mails.map(
      ({ email }) => email
    )

    sgMail.setApiKey(process.env.SENDGRID!)
    if (!emails.length) return undefined
    return sgMail.send({ to: emails, from, subject, text, html })
  }

  public async emailExist(email: string): Promise<Boolean> {
    let mail = await Email.findOne({ email }).exec()
    return !!mail
  }
  public async getEmails(): Promise<EmailInterface[]> {
    return Email.find().exec()
  }

  public async deleteEmailById(_id: mongoose.Types.ObjectId | string): Promise<Boolean> {
    try {
      await Email.deleteOne({ _id }).exec()
      return true
    } catch (err) {
      await errorService.writeErrorLog(err, "service/email")
      return false
    }

  }


}


export const emailService: EmailService = new EmailService()
