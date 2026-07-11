# ADR-001: Use a Modular Monolith

## Status

Accepted

## Date

2026-07-10

## Context

ResolveIQ is being designed as an extensible IT operations platform with several business areas:

* Identity and organisation management
* Service management
* Asset management
* Knowledge management
* Reporting
* Notifications
* Administration
* Future diagnostic and recommendation capabilities

These areas must remain clearly separated so the application does not become a tightly coupled codebase.

A microservice architecture was considered because individual business areas could eventually require independent scaling or deployment.

However, ResolveIQ Version 1 will be developed by a small team and deployed as one product. Introducing distributed services at this stage would create significant operational complexity without providing meaningful business value.

Microservices would require:

* Multiple deployment pipelines
* Service-to-service authentication
* Network-based communication
* Distributed tracing
* More complex local development
* More complex integration testing
* Additional monitoring
* Failure recovery between services
* Distributed transaction handling
* More infrastructure and hosting costs

A traditional monolith would be simpler, but without enforced internal boundaries it could become difficult to maintain as the platform grows.

## Decision

ResolveIQ Version 1 will use a modular monolith architecture.

The backend will be deployed as one application and will use one primary PostgreSQL database.

Internally, the application will be divided into business-focused modules with clear responsibilities and boundaries.

Initial modules include:

* Authentication
* Organisation
* Users
* Service Management
* Asset Management
* Knowledge Management
* Reporting
* Notifications
* Administration

Each module may contain:

* Domain logic
* Application use cases
* Repository contracts
* Infrastructure implementations
* HTTP presentation logic
* Tests

Modules must expose clear public interfaces.

A module must not directly depend on another module's internal implementation.

Shared code will only be placed in common folders when it represents a genuinely cross-cutting concern.

Examples include:

* Error handling
* Logging
* Database transaction support
* Request identification
* Common value objects
* Configuration
* Authentication context

## Rationale

A modular monolith provides the best balance for ResolveIQ's current stage.

It offers:

* Simpler local development
* Easier debugging
* One deployment unit
* Lower infrastructure costs
* Straightforward database transactions
* Clear business boundaries
* Faster feature delivery
* Easier automated testing
* A practical path toward future service extraction

The architecture allows the project to demonstrate professional software design without adding unnecessary distributed-system complexity.

## Consequences

### Positive consequences

* Developers can run the complete backend as one process.
* Features can be developed and tested more quickly.
* Database transactions can safely span related operations.
* Authentication and authorization remain centralized.
* Deployment and monitoring are simpler.
* Business modules remain independently understandable.
* Future services can be extracted from established module boundaries.

### Negative consequences

* All backend modules are deployed together.
* A failure in one module may affect the complete backend process.
* Modules share the same primary database infrastructure.
* Independent scaling of one module is not available initially.
* Architectural boundaries must be enforced through code structure and reviews rather than network separation.

## Boundary Rules

The following rules apply:

1. Controllers must not query Prisma directly.
2. Business rules must not depend on Express.
3. Application use cases depend on repository interfaces.
4. Prisma implementations belong in infrastructure layers.
5. Modules must not import another module's internal infrastructure code.
6. Cross-module communication must use public application contracts.
7. Shared folders must not become a dumping ground for unrelated code.
8. Circular module dependencies are not allowed.
9. Important cross-module operations must use transactions or domain events where appropriate.
10. Module boundaries must be checked during code reviews.

## Future Review Conditions

This decision should be reviewed if one or more of the following becomes true:

* A module requires significantly different scaling.
* A module requires independent deployment.
* A module has substantially different reliability requirements.
* A security boundary requires stronger isolation.
* Device telemetry introduces high-volume ingestion workloads.
* Reporting workloads reduce transactional database performance.
* Independent engineering teams own separate modules.
* Deployment frequency differs significantly between modules.

Reaching a large codebase alone is not sufficient reason to adopt microservices.

A module should only be extracted when the operational benefit clearly exceeds the distributed-system cost.

## Alternatives Considered

### Traditional monolith

A traditional monolith would be simple to deploy but could allow business logic, controllers and database access to become tightly coupled.

This option was rejected because ResolveIQ is expected to grow into several connected product areas.

### Microservices

Microservices would provide independent deployment and scaling.

This option was rejected for Version 1 because the operational cost would exceed the current benefits.

### Serverless functions

A serverless API could reduce infrastructure management for isolated workloads.

This option was rejected as the primary architecture because ResolveIQ contains complex relational workflows, shared authorization, transactions and connected domain logic.

Serverless functions may still be used later for isolated asynchronous tasks.

## Final Outcome

ResolveIQ will begin as a modular monolith with enforced business boundaries.

The system will remain simple enough to build and operate while preserving a realistic path toward future architectural evolution.
