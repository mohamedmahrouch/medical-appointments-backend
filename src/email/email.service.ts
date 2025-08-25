import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: '',
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('E-mail envoyé :', info.response);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
    }
  }
  async sendRendezVousUpdateNotification(to: string, date: string, heure: string) {
    const subject = 'Mise à jour de votre rendez-vous';
    const text = `Votre rendez-vous a été avancé de 30 minutes. Nouvelle heure : ${heure} le ${date}.`;
  
    await this.sendEmail(to, subject, text);
  }
  async sendRendezVousConfirmation(patientEmail: string, doctorEmail: string, date: string, heure: string,patientname:string,medecinname:string) {
    const subjectpatient = 'Confirmation de votre rendez-vous';
    const subjectdoctor = 'un nouveau rendez-vous';

    const messagepatient = `Votre rendez-vous est confirmé pour le ${date} à ${heure} avec le medecin ${medecinname}.`;
    const messagedoctor = `Vous avez un rendez-vous est confirmé pour le ${date} à ${heure} avec le patient ${patientname}.`;

    await this.sendEmail(patientEmail, subjectpatient, messagepatient);
    await this.sendEmail(doctorEmail, subjectdoctor, messagedoctor);
  }
}