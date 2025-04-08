# Full-Stack Docker Application

A modern full-stack application built with Next.js, Express, and MySQL, fully containerized with Docker.

## Overview

This project demonstrates a complete web application architecture using:
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Express.js API with Prisma ORM
- **Database**: MySQL for data storage
- **Infrastructure**: Docker for containerization and Nginx for reverse proxy

## Quick Start

```bash
# Clone the repository
git clone https://github.com/gitaravenian/docker-master-test.git
cd testing-docker

# Start the application
docker-compose -f docker-compose.simple.yml up -d --build

# Access the application at http://localhost or your server IP
```

For more detailed instructions, see [QUICK-START.md](./QUICK-START.md).

## Features

- Modern UI built with Next.js and Tailwind CSS
- RESTful API backend with Express
- Database integration with Prisma ORM
- Containerized deployment with Docker and Docker Compose
- Reverse proxy with Nginx
- Error handling and graceful degradation
- Responsive design for all devices

## Architecture

The application uses a microservices architecture:

```
Client → Nginx → Frontend (Next.js) → Backend (Express) → Database (MySQL)
```

For a detailed look at the architecture, see [DOCUMENTATION.md](./DOCUMENTATION.md).

## Development

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose

### Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

### Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test
```

## Documentation

- [Comprehensive Documentation](./DOCUMENTATION.md) - Complete system guide
- [Quick Start Guide](./QUICK-START.md) - Essential commands to get started

## Security

- All environment variables must be properly set in production
- Default passwords must be changed
- CORS is configured for frontend origin only
- Security headers are properly configured
- Authentication required for protected routes

## License

MIT
