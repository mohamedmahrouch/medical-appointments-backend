import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { RendezVous } from './rendez_vous.entity';
import { CreateRendezVousDto } from './dto/create-rendez-vous.dto';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
import { EmailService } from '../email/email.service'; 
import { PatientsService } from 'src/patients/patients.service';
import {MedecinService} from 'src/medecin/medecin.service'; // Import du service MedecinService


@Injectable()
export class RendezVousService {
  constructor(
    @InjectRepository(RendezVous)
    private readonly rendezVousRepository: Repository<RendezVous>, // Nom de la variable corrigé ici
    private readonly emailService: EmailService, 
    private readonly patientsService: PatientsService, // Injection du service PatientsService
    private readonly medecinService: MedecinService,// Injection du service Email
  ) {}

  async create(createRendezVousDto: CreateRendezVousDto): Promise<RendezVous> {
    const rendezVous = this.rendezVousRepository.create(createRendezVousDto);
    const savedRendezVous = await this.rendezVousRepository.save(rendezVous);

    // Récupération des emails du patient et du médecin
    const patient = await this.patientsService.findOne(savedRendezVous.patient.id);
    const medecin = await this.medecinService.findOne(savedRendezVous.medecin.id); 

    if (!patient || !medecin) {
      throw new Error('Patient or Medecin not found');
    }

    const patientEmail = patient.email;
    const medecinEmail = medecin.email;
    const patientname = patient.firstName;
    const medecinname=medecin.firstName;


    console.log(patientEmail);
    console.log(medecinEmail);

    // Envoi des emails avec les détails du rendez-vous
    await this.emailService.sendRendezVousConfirmation(patientEmail, medecinEmail, savedRendezVous.date, savedRendezVous.heure,patientname,medecinname);

    return savedRendezVous;
  }

  async findByPatientId(patientId: string): Promise<RendezVous[]> {
    return await this.rendezVousRepository.find({
      where: { patient: { id: patientId } },
      relations: ['patient', 'medecin'],
    });
  }
  async findByMedecinId(medecinId: string): Promise<RendezVous[]> {
    return await this.rendezVousRepository.find({
      where: { medecin: { id: medecinId } },
      relations: ['patient', 'medecin'], // Inclure les relations si nécessaire
    });
  }

  async findAll(): Promise<RendezVous[]> {
    return await this.rendezVousRepository.find(); // Correction du nom de variable
  }

  async findOne(id: string): Promise<RendezVous> {
    const rendezVous = await this.rendezVousRepository.findOne({ where: { id } }); // Correction du nom de variable
    if (!rendezVous) {
      throw new NotFoundException(`Rendez-vous with id ${id} not found`);
    }
    return rendezVous;
  }

  async update(id: string, updateRendezVousDto: UpdateRendezVousDto): Promise<RendezVous> {
    const rendezVous = await this.findOne(id); // Correction du nom de variable
    Object.assign(rendezVous, updateRendezVousDto);

    return await this.rendezVousRepository.save(rendezVous); 
   // Correction du nom de variable
  }

  async delete(id: string): Promise<string> {
    const result = await this.rendezVousRepository.delete(id); // Correction du nom de variable
    if (result.affected === 0) {
      throw new NotFoundException('Rendez-vous not found');
    }
    return `Rendez-vous with ID ${id} has been deleted successfully.`;
  }
  // async updateRendezVousAndNotifyPatients(id: string, updateRendezVousDto: UpdateRendezVousDto): Promise<void> {
  //   const rendezVous = await this.findOne(id);
  
  //   // Vérifiez si le statut est changé à "annulé" ou "supprimé"
  //   if (updateRendezVousDto.statut === 'annulé' || updateRendezVousDto.statut === 'supprimé') {
  //     // Récupérez tous les rendez-vous après celui-ci
  //     const rendezVousAfter = await this.rendezVousRepository.find({
  //       where: {
  //         date: rendezVous.date,
  //         heure: MoreThan(rendezVous.heure),
  //       },
  //       order: { heure: 'ASC' },
  //     });
  
  //     // Mettez à jour les heures des rendez-vous suivants
  //     for (const rdv of rendezVousAfter) {
  //       const newHeure = new Date(rdv.heure);
  //       newHeure.setMinutes(newHeure.getMinutes() - 30); // Diminuez l'heure de 30 minutes
  //       rdv.heure = newHeure.toTimeString().split(' ')[0]; // Format HH:MM:SS
  
  //       await this.rendezVousRepository.save(rdv);
  
  //       // Envoyez un email au patient concerné
  //       const patient = await this.patientsService.findOne(rdv.patient.id);
  //       if (patient) {
  //         await this.emailService.sendRendezVousUpdateNotification(
  //           patient.email,
  //           rdv.date,
  //           rdv.heure,
  //         );
  //       }
  //     }
  //   }
  
  //   // Mettez à jour le rendez-vous actuel
  //   Object.assign(rendezVous, updateRendezVousDto);
  //   await this.rendezVousRepository.save(rendezVous);
  // }
}
