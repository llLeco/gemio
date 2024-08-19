# Gemio: Digital Twin Asset Management on Hedera

Gemio is an innovative project aimed at revolutionizing industrial asset management through the creation of "digital twins" using Hedera Hashgraph blockchain technology. This application provides a robust solution for creating, managing, and tracking high-value industrial assets throughout their lifecycle.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

Gemio addresses critical challenges in information sharing and traceability for the manufacturing and maintenance of high-value industrial machinery. By leveraging blockchain technology, Gemio offers a secure, transparent, and efficient solution for asset management.

## Features

- Create and manage digital representations of industrial assets
- Track asset lifecycle events and maintenance history
- Manage user permissions for asset access
- Create and manage asset collections
- Integration with Hedera Hashgraph for secure and transparent record-keeping

## Technology Stack

### Frontend
- Angular 18
- Ionic Framework

### Backend
- NestJS
- Hedera JavaScript SDK

### Database
- Hedera Hashgraph (for blockchain storage)

## Project Structure

The project is divided into two main parts:

1. Frontend (Ionic/Angular application)
2. Backend (NestJS application)

### Frontend Structure

```
src/
├── app/
│   ├── asset-details/
│   ├── asset-form/
│   ├── collection-form/
│   ├── collections/
│   ├── dashboard/
│   ├── guards/
│   ├── login/
│   ├── permissions/
│   ├── services/
│   └── shared/
├── assets/
├── environments/
└── theme/
```

### Backend Structure

```
backend/
├── src/
│   ├── assets/
│   ├── auth/
│   ├── collections/
│   ├── hedera/
│   ├── models/
│   └── users/
└── test/
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gemio.git
   cd gemio
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd backend && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     HEDERA_ACCOUNT_ID=your_hedera_account_id
     HEDERA_PRIVATE_KEY=your_hedera_private_key
     HEDERA_NETWORK=testnet
     JWT_SECRET=your_jwt_secret
     ```

4. Configure the frontend environment:
   - Update `src/environments/environment.ts` and `environment.prod.ts` with the correct API URL.

## Running the Application

1. Start the frontend and the backend server:
   ```
   npm run start:dev
   ```

3. Access the application at `http://localhost:8100`

## API Documentation

The backend API provides the following main endpoints:

- `/auth`: Authentication endpoints
- `/assets`: Asset management endpoints
- `/collections`: Collection management endpoints
- `/hedera`: Hedera-specific operations

For detailed API documentation, please refer to the individual controller files in the backend source code.

## Contributing

We welcome contributions to the Gemio project. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Create a pull request to the main repository

## License

This project is licensed under the MIT License. See the LICENSE file for details.
