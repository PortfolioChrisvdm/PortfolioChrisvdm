# ResolveIQ System Architecture

## Purpose

This document defines the technical architecture for ResolveIQ Version 1.

ResolveIQ will begin as a modular monolith. The application will be deployed as one backend service, but its internal codebase will be divided into clear business modules.

This approach gives the project strong architectural boundaries without introducing the operational complexity of microservices too early.

---

# Architecture Goals

The architecture must be:

* Understandable
* Testable
* Secure
* Maintainable
* Modular
* Scalable
* Observable
* Suitable for incremental development

The system should support future growth without requiring a full rewrite.

---

# High-Level Architecture

```text
┌─────────────────────────────────────┐
│            React Client             │
│                                     │
│  Pages                              │
│  Components                         │
│  Forms                              │
│  State Management                   │
│  API Client                         │
└──────────────────┬──────────────────┘
                   │
                   │ HTTPS / REST
                   ▼
┌─────────────────────────────────────┐
│         Node.js API Server          │
│                                     │
│  Authentication                    │
│  Request Validation                │
│  Controllers                       │
│  Application Services              │
│  Domain Rules                      │
│  Authorization                    │
│  Audit Logging                    │
└──────────────────┬──────────────────┘
                   │
                   │ Prisma ORM
                   ▼
┌─────────────────────────────────────┐
│          PostgreSQL Database        │
│                                     │
│  Users                              │
│  Roles                              │
│  Work Items                         │
│  Assets                             │
│  Comments                           │
│  Status History                     │
│  Audit Events                       │
└─────────────────────────────────────┘
```

---

# Architectural Style

## Modular Monolith

ResolveIQ Version 1 will use a modular monolith.

This means:

* One backend application
* One primary database
* One deployment unit
* Multiple internal business modules
* Strict boundaries between modules
* Shared infrastructure only where appropriate

The application will not begin as a microservice system.

Microservices would add:

* Network communication
* Distributed transactions
* More deployment pipelines
* More monitoring requirements
* More failure points
* More development overhead

The current project does not need that complexity.

---

# Backend Modules

The backend will be divided into business-focused modules.

```text
server/
└── src/
    ├── modules/
    │   ├── authentication/
    │   ├── organisation/
    │   ├── users/
    │   ├── service-management/
    │   ├── asset-management/
    │   ├── knowledge-management/
    │   ├── reporting/
    │   ├── notifications/
    │   └── administration/
    │
    ├── shared/
    ├── infrastructure/
    ├── config/
    ├── app.ts
    └── server.ts
```

Not every module will be fully implemented in Version 1.

The structure is designed so later functionality can be added without placing unrelated logic into existing modules.

---

# Backend Layer Responsibilities

Each business module should contain clear internal layers.

```text
module/
├── domain/
├── application/
├── infrastructure/
├── presentation/
└── tests/
```

## Domain Layer

The domain layer contains business concepts and rules.

Examples:

* Ticket status transition rules
* Priority calculation
* Asset assignment rules
* Permission decisions
* SLA calculations

The domain layer should not depend directly on:

* Express
* Prisma
* HTTP requests
* React
* External services

This keeps business logic testable and portable.

---

## Application Layer

The application layer coordinates use cases.

Examples:

* Create an incident
* Assign a technician
* Resolve a ticket
* Add an internal note
* Assign an asset
* Deactivate a user

Application services decide which domain rules and repositories are required to complete an operation.

Example:

```text
CreateIncidentUseCase
    ↓
Validate reporter
    ↓
Calculate priority
    ↓
Create work item
    ↓
Save diagnostic responses
    ↓
Create audit event
    ↓
Return result
```

---

## Infrastructure Layer

The infrastructure layer communicates with technical systems.

Examples:

* PostgreSQL
* Prisma
* Email provider
* File storage
* Logging service
* External APIs

Repositories will be implemented here.

Example:

```text
TicketRepository
    ↑
PrismaTicketRepository
```

The application layer depends on the repository contract, not directly on Prisma.

---

## Presentation Layer

The presentation layer handles HTTP communication.

It includes:

* Routes
* Controllers
* Request validation
* Response formatting
* Authentication middleware
* Authorization middleware

Controllers should remain small.

A controller should:

1. Read validated input
2. Call an application use case
3. Return the response

Controllers should not contain complex business rules.

---

# Request Lifecycle

A normal API request follows this path:

```text
Browser
   ↓
Route
   ↓
Authentication Middleware
   ↓
Authorization Middleware
   ↓
Validation Middleware
   ↓
Controller
   ↓
Application Use Case
   ↓
Domain Logic
   ↓
Repository
   ↓
PostgreSQL
   ↓
Response
```

Example:

```text
POST /api/v1/incidents
```

The request flow will be:

```text
Employee submits incident
        ↓
JWT is verified
        ↓
Permission is checked
        ↓
Request body is validated
        ↓
CreateIncidentUseCase runs
        ↓
Priority is calculated
        ↓
Incident is saved
        ↓
Status history is created
        ↓
Audit event is created
        ↓
Created incident is returned
```

---

# Frontend Architecture

The frontend will use React and TypeScript.

Proposed structure:

```text
client/
└── src/
    ├── app/
    ├── assets/
    ├── components/
    ├── features/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── types/
    ├── utils/
    └── main.tsx
```

---

# Feature-Based Frontend Structure

Business-specific frontend code should be grouped by feature.

```text
features/
├── authentication/
├── tickets/
├── incidents/
├── service-requests/
├── assets/
├── users/
├── dashboard/
└── administration/
```

A feature may contain:

```text
tickets/
├── api/
├── components/
├── hooks/
├── pages/
├── schemas/
├── types/
└── utils/
```

This prevents the codebase from becoming one large folder containing unrelated components.

---

# Frontend Responsibilities

## Pages

Pages represent complete routes.

Examples:

* Login page
* Dashboard page
* Ticket details page
* Create incident page
* Asset details page

## Components

Components represent reusable UI pieces.

Examples:

* Status badge
* Priority badge
* Data table
* Timeline item
* Search input
* Modal dialog

## API Services

API service functions communicate with the backend.

React components should not contain raw `fetch` calls spread throughout the codebase.

Example:

```text
createIncident()
getIncidentById()
assignTechnician()
changeTicketStatus()
```

## Forms and Validation

Forms will use shared validation schemas where practical.

The client validates input for usability.

The server validates input for security and correctness.

Client-side validation never replaces server-side validation.

---

# Work Item Architecture

ResolveIQ will use a base work-item concept.

```text
Work Item
├── Incident
├── Service Request
└── Task
```

Common work-item fields include:

* ID
* Reference number
* Title
* Description
* Status
* Priority
* Reporter
* Assignee
* Assigned team
* Created date
* Updated date

Type-specific data will be stored separately where needed.

This avoids duplicating common fields while allowing incidents and service requests to have different rules.

---

# Authentication Architecture

Version 1 will use:

* Email and password login
* Secure password hashing
* Short-lived access tokens
* Longer-lived refresh tokens
* Token rotation
* Role-based access control
* Permission-based authorization

Recommended token handling:

* Access token stored in memory
* Refresh token stored in a secure, HTTP-only cookie
* Refresh token rotated after use
* Revoked sessions stored in the database

Passwords must never be stored or logged in plain text.

---

# Authorization Architecture

ResolveIQ will use roles and permissions.

Example:

```text
Role: Technician

Permissions:
- tickets.read.all
- tickets.assign
- tickets.update.status
- comments.create.internal
- assets.read
```

Application code should check permissions rather than relying only on role names.

Avoid:

```text
if user.role == "admin"
```

Prefer:

```text
user has permission "users.manage"
```

This gives the system more flexibility as roles evolve.

---

# Validation

All external input must be validated.

Examples:

* Request bodies
* Route parameters
* Query parameters
* Uploaded files
* Environment variables

Validation failures should return consistent error responses.

Example:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data.",
    "details": {
      "title": "Title is required."
    }
  }
}
```

---

# Error Handling

The backend will use centralized error handling.

Application errors should use known error types.

Examples:

* ValidationError
* AuthenticationError
* AuthorizationError
* NotFoundError
* ConflictError
* BusinessRuleError

Unexpected errors should:

* Be logged
* Return a safe generic response
* Never expose stack traces in production
* Include a request correlation ID

---

# Audit Architecture

Important actions must create audit events.

Examples:

* User created
* User deactivated
* Role changed
* Ticket assigned
* Priority overridden
* Status changed
* Asset reassigned
* Internal note created

Audit events should record:

* Actor
* Action
* Target type
* Target ID
* Timestamp
* Request ID
* Previous values where relevant
* New values where relevant

Audit events should be append-only.

---

# Timeline Architecture

ResolveIQ will present a unified timeline for important entities.

Timeline entries may come from:

* Comments
* Status changes
* Assignments
* Audit events
* Device events
* Recommendations
* Resolution actions

The timeline is a read model.

It does not replace the source records.

Instead, it combines relevant events into one chronological view.

Example:

```text
Ticket created
Technician assigned
Priority recalculated
Internal note added
Status changed
User replied
Resolution recorded
Ticket closed
```

---

# Database Access

Prisma will be used as the PostgreSQL ORM.

Database access must remain inside repositories or infrastructure services.

Avoid:

```text
Controller
    ↓
Prisma query
```

Prefer:

```text
Controller
    ↓
Use Case
    ↓
Repository Interface
    ↓
Prisma Repository
```

This separation improves:

* Testability
* Maintainability
* Business-rule isolation
* Future migration options

---

# Transactions

Database transactions must be used when an operation changes multiple related records.

Example: creating an incident may require:

* Creating the work item
* Creating the incident details
* Saving diagnostic answers
* Creating status history
* Creating an audit event

These changes should succeed or fail together.

---

# API Design

The backend will expose a versioned REST API.

Base path:

```text
/api/v1
```

Example endpoints:

```text
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout

GET    /api/v1/work-items
POST   /api/v1/incidents
GET    /api/v1/incidents/:id
PATCH  /api/v1/incidents/:id
POST   /api/v1/incidents/:id/comments
POST   /api/v1/incidents/:id/assignments

GET    /api/v1/assets
POST   /api/v1/assets
GET    /api/v1/assets/:id

GET    /api/v1/users
GET    /api/v1/users/:id
```

The final endpoint specification will be documented separately.

---

# Security Controls

Version 1 should include:

* Password hashing
* Secure cookies
* Token expiration
* Refresh-token rotation
* Input validation
* Rate limiting
* CORS configuration
* Security headers
* Permission checks
* File upload restrictions
* Audit logging
* Environment-variable validation
* Safe error handling

---

# Observability

The application should record structured logs.

Each request should receive a request ID.

Logs should include:

* Request ID
* HTTP method
* Route
* Response status
* Duration
* Authenticated user ID where appropriate
* Error type

Sensitive information must not be logged.

Do not log:

* Passwords
* Tokens
* Cookie values
* Private attachment contents

---

# Testing Strategy

## Unit Tests

Test isolated business rules.

Examples:

* Priority calculation
* Status transitions
* Permission checks
* Asset assignment rules

## Integration Tests

Test multiple backend components together.

Examples:

* Create incident through API
* Authenticate user
* Assign technician
* Add internal note
* Query database results

## End-to-End Tests

Test critical user workflows in a browser.

Examples:

* Employee logs in and creates an incident
* Technician receives and updates the incident
* Administrator creates a user
* Employee cannot view an internal note

---

# Deployment Architecture

Initial production deployment:

```text
React Frontend
      ↓
Static hosting platform
      ↓
Node.js API
      ↓
Managed PostgreSQL
```

Docker will be used for local development and production consistency.

Proposed services:

```text
resolveiq-client
resolveiq-server
resolveiq-database
```

The exact hosting providers may change without affecting the core architecture.

---

# Environment Separation

The project should support:

* Development
* Test
* Production

Each environment must have separate:

* Database
* Secrets
* Configuration
* Logging level

Production secrets must never be committed to Git.

---

# Version 1 Deployment Model

Version 1 will use:

* One frontend application
* One backend application
* One PostgreSQL database
* One object-storage provider for attachments
* One CI/CD workflow

This is sufficient for the intended scale and project goals.

---

# Future Evolution

The modular monolith may later evolve by extracting high-demand modules.

Possible future services:

* Notification service
* Search service
* Device telemetry ingestion service
* Recommendation service
* Reporting service
* Attachment-processing service

Modules should only become services when there is a clear operational reason.

Possible reasons include:

* Independent scaling
* Separate deployment requirements
* Security isolation
* High processing load
* Different reliability needs

Microservices are not a goal by themselves.

---

# Architectural Principles

## Business logic belongs in the domain

Frameworks should deliver requests to the business logic, not contain the business logic.

## Modules communicate through clear contracts

One module should not reach directly into another module's internal database implementation.

## Security is enforced on the server

Frontend permission checks improve usability but do not provide security.

## Historical data is preserved

Important operational records should be archived or deactivated rather than silently deleted.

## Every important recommendation is explainable

Automated decisions must expose reasoning and supporting evidence.

## Start simple, preserve room to grow

The architecture should support future expansion without adding unnecessary complexity today.
