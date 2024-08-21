# Gemio: Digital Twin Asset Management on Hedera

Gemio revolutionizes industrial asset management by creating "digital twins" using Hedera Hashgraph blockchain technology. Our solution offers secure, transparent, and efficient management of high-value industrial assets throughout their lifecycle.

## Live Demo

**Access the live application here: http://34.174.181.4:8100/login**

Test Credentials:
* Username: creator
* Password: 1221

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Local Setup and Installation](#local-setup-and-installation)
* [Running the Application Locally](#running-the-application-locally)
* [Market Validation](#market-validation)
* [API Documentation](#api-documentation)

## Overview

Gemio addresses critical challenges in information sharing and traceability for the manufacturing and maintenance of high-value industrial machinery. By leveraging blockchain technology, we offer:

* Secure and immutable record-keeping
* Real-time asset tracking and management
* Streamlined collaboration between manufacturers, distributors, and maintenance teams
* Enhanced decision-making based on comprehensive asset data

### Additional Information

For full project documentation, please visit our [Gemio Gitbook](https://gemio.gitbook.io/)

## Key Features

1. **Digital Twin Creation**: Generate precise digital representations of physical assets
2. **Lifecycle Tracking**: Monitor and record all events throughout an asset's lifespan
3. **Permission Management**: Control and audit access to asset information
4. **Collection Management**: Organize assets into logical groupings
5. **Blockchain Integration**: Utilize Hedera Hashgraph for secure and transparent data storage
6. **Real-time Updates**: Instantly sync asset information across the network

## Technology Stack

### Frontend
* Angular 18
* Ionic Framework

### Backend
* NestJS
* Hedera JavaScript SDK

### Blockchain
* Hedera Hashgraph

## Local Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gemio.git
cd gemio
```

2. Install dependencies:

```bash
npm install
cd backend && npm install
```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with:

```makefile
HEDERA_ACCOUNT_ID=your_hedera_account_id
HEDERA_PRIVATE_KEY=your_hedera_private_key
HEDERA_NETWORK=testnet
JWT_SECRET=your_jwt_secret
```

## Running the Application Locally

1. Start both frontend and backend:

```arduino
npm run start:dev
```

2. Access the application at `http://localhost:8100`

## Market Validation

Market validation for Gemio has been achieved through strategic partnerships and interest from key industry players:

* **Iliot**: As a service provider, Iliot has agreed to support the project and perform the first integration of Gemio's service for asset import and OS (Order of Service) creation. This partnership was highlighted in our video pitch.

* **Parker Hannifin**: This air compressor machinery manufacturer has expressed support for Gemio and is eager to participate in the first stage of testing. Their involvement signals strong interest from potential end-users within the industry.

These early validations demonstrate market demand and interest in the Gemio solution, providing a solid foundation for further development and expansion.

## API Documentation

Main API endpoints:
* `/auth`: Authentication
* `/assets`: Asset management
* `/collections`: Collection management
* `/hedera`: Hedera-specific operations

For detailed API documentation, please refer to the individual controller files in the backend source code.
