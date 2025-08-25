<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a medical appointments management system backend built with NestJS. The system facilitates appointment scheduling between patients and doctors, with nurses managing the administrative aspects. Key features include:

- User Authentication and Authorization (JWT-based)
  - Patient registration and login
  - Doctor registration and login
  - Nurse/Office staff registration and login
  - Role-based access control

- Appointment Management
  - Create, read, update, and delete appointments
  - Automatic email notifications for appointments
  - View appointments by patient
  - View appointments by doctor
  - Status tracking (pending, confirmed, cancelled)

- User Management
  - Patient profiles with personal information
  - Doctor profiles with photo upload capability
  - Office staff management
  
- Email Notifications
  - Appointment confirmation emails
  - Updates and reminders
  - Multi-recipient notifications (both patient and doctor)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later recommended)
- MySQL Server
- npm or yarn

## Project Setup

1. Clone the repository:
```bash
$ git clone https://github.com/mohamedmahrouch/medical-appointments-backend.git
$ cd medical-appointments-backend
```

2. Install dependencies:
```bash
$ npm install
```

3. Configure the database:
- Create a MySQL database named `Rendez_vous_db`
- Update the database configuration in `src/config/database.config.ts` if needed

4. Configure email settings:
- Update the email configuration in `src/email/email.service.ts` with your SMTP credentials

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### Authentication
- `POST /auth/register-patient` - Register a new patient
- `POST /auth/login-patient` - Patient login
- `POST /auth/register-medecin` - Register a new doctor
- `POST /auth/login-medecin` - Doctor login
- `POST /auth/register-infirmier` - Register a new nurse
- `POST /auth/login-infirmier` - Nurse login

### Appointments
- `GET /rendez-vous` - List all appointments
- `GET /rendez-vous/:id` - Get appointment details
- `POST /rendez-vous` - Create new appointment
- `PUT /rendez-vous/:id` - Update appointment
- `DELETE /rendez-vous/:id` - Delete appointment
- `GET /rendez-vous/patient/:patientId` - Get patient's appointments
- `GET /rendez-vous/medecin/:medecinId` - Get doctor's appointments

### Patients
- `GET /patients` - List all patients
- `GET /patients/:id` - Get patient details
- `POST /patients` - Create patient profile
- `PUT /patients/:id` - Update patient profile
- `DELETE /patients/:id` - Delete patient profile

### Doctors
- `GET /medecin` - List all doctors
- `GET /medecin/:id` - Get doctor details
- `POST /medecin` - Create doctor profile
- `PATCH /medecin/:id` - Update doctor profile
- `DELETE /medecin/:id` - Delete doctor profile
- `POST /medecin/:id/upload-photo` - Upload doctor's photo

### Office Staff
- `GET /infirmier-de-bureau` - List all office staff
- `GET /infirmier-de-bureau/:id` - Get staff member details
- `POST /infirmier-de-bureau` - Create staff profile
- `PATCH /infirmier-de-bureau/:id` - Update staff profile
- `DELETE /infirmier-de-bureau/:id` - Delete staff profile

## Security

The application implements several security features:
- JWT-based authentication
- Role-based access control
- Password hashing using bcrypt
- Input validation using class-validator
- CORS protection
- Request logging middleware

## Related Applications

### Frontend Application
The frontend application for this project can be found in the following repository:
- Repository: [medical-appointments-frontend](https://github.com/mohamedmahrouch/medical-appointments-frontend)

This frontend application provides the user interface for the medical appointments system. Please refer to the frontend repository for setup instructions and more details.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.



## Author

- Mohamed Mahrouch
- GitHub: [@mohamedmahrouch](https://github.com/mohamedmahrouch) 
