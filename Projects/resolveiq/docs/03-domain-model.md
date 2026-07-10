# ResolveIQ Domain Model

## Purpose

This document defines the main business entities in ResolveIQ and explains how they relate to one another.

The domain model is not a database schema. It describes the business concepts the platform must understand before technical implementation begins.

---

# Core Domains

ResolveIQ is divided into connected business domains.

## Identity and Organisation

Manages people, teams, departments, roles and locations.

## Service Management

Manages incidents, service requests, tasks, comments and service-level agreements.

## Asset Management

Manages devices, software, licences, warranties and asset ownership.

## Knowledge Management

Stores reusable solutions, troubleshooting guides and operational documentation.

## Intelligence

Analyses patterns, duplicate reports, recurring issues, risk and resolution history.

## Platform Administration

Manages configuration, permissions, audit records and system settings.

---

# Core Entities

## Organisation

Represents the company using ResolveIQ.

Although Version 1 targets one internal organisation, the entity is included so the system can support multiple organisations in the future without a major redesign.

### Main responsibilities

* Owns departments
* Owns locations
* Owns users
* Owns assets
* Owns service-management records
* Owns configuration and policies

### Important rules

* Every business record must belong to an organisation.
* Organisation data must never be visible to another organisation.
* An organisation should normally be deactivated rather than permanently deleted.

---

## User

Represents a person who can access the platform.

A user may be:

* An employee
* A technician
* A team leader
* An administrator
* A manager
* An auditor

### Main responsibilities

* Authenticates into the platform
* Reports issues
* Submits service requests
* Owns or uses assigned assets
* Comments on tickets
* Resolves or manages work based on permissions

### Key information

* Name
* Email
* Job title
* Department
* Manager
* Location
* Employment status
* Contact details
* Account status
* Last login
* Assigned roles
* Assigned assets

### Important rules

* A user may have multiple roles.
* Roles determine permissions, not job titles.
* Users should normally be deactivated rather than deleted.
* Historical activity must remain visible after deactivation.

---

## Role

Represents a named set of permissions.

Examples:

* Employee
* Technician
* Senior Technician
* Service Desk Manager
* Asset Manager
* Administrator
* Auditor

### Important rules

* A user can have multiple roles.
* A role can be assigned to many users.
* Permissions should be granted through roles rather than hard-coded checks.
* System roles may be protected from deletion.

---

## Permission

Represents an individual action a user is allowed to perform.

Examples:

* Create a ticket
* View own tickets
* View all tickets
* Assign technicians
* Manage assets
* View internal notes
* Close incidents
* Manage users
* View audit records

### Important rules

* Permissions are assigned to roles.
* Permissions should use clear action-based names.
* Sensitive actions must be logged.

---

## Department

Represents a business unit.

Examples:

* Finance
* Human Resources
* Operations
* Sales
* Information Technology

### Main responsibilities

* Groups users
* Supports reporting
* Influences ticket impact
* Supports routing and service ownership

### Important rules

* A department may contain many users.
* A user belongs to one primary department.
* Departments may have parent departments.
* Departments should be deactivated rather than deleted when historical data exists.

---

## Location

Represents a physical or logical workplace.

Examples:

* Johannesburg Head Office
* Cape Town Branch
* Building A
* Second Floor
* Remote

### Main responsibilities

* Groups users and assets
* Supports outage detection
* Supports technician routing
* Supports location-based reporting

### Important rules

* Locations may be nested.
* A user may have one primary location.
* An asset may have a current location.
* Location history may be tracked later.

---

# Service Management Entities

## Ticket

Represents work submitted to the IT service team.

A ticket is the general parent concept for work records.

Ticket types include:

* Incident
* Service Request

### Common information

* Ticket number
* Title
* Description
* Status
* Priority
* Impact
* Urgency
* Reporter
* Requested for
* Assigned team
* Assigned technician
* Category
* Related asset
* Related location
* Created date
* Due date
* Resolution date
* Closure date

### Important rules

* Every ticket has one reporter.
* A ticket may be submitted for another user.
* A ticket may be related to multiple assets.
* A ticket may have multiple tasks.
* A ticket must preserve status history.
* A closed ticket should not be silently edited.

---

## Incident

Represents an unplanned interruption or reduction in the quality of an IT service.

Examples:

* Laptop will not start
* Email is unavailable
* Printer is offline
* Network connection is unstable

### Main responsibilities

* Tracks service disruption
* Records impact and urgency
* Supports diagnosis
* Links affected users and assets
* Links related incidents
* Stores root cause and resolution

### Important rules

* Multiple user reports may relate to one major incident.
* An incident may be linked to a known problem.
* Priority should be calculated using impact and urgency.
* Resolution and closure are separate states.
* Major incidents require additional review.

---

## Service Request

Represents a planned request for access, equipment, information or a standard service.

Examples:

* Request new software
* Request a laptop
* Request account access
* Request a password reset
* Request onboarding equipment

### Main responsibilities

* Captures structured request information
* Supports approval workflows
* Creates fulfilment tasks
* Tracks delivery and completion

### Important rules

* Different request types require different forms.
* Requests may require one or more approvals.
* Requests may create multiple tasks.
* Standard requests should follow repeatable workflows.

---

## Task

Represents a unit of work required to complete a ticket.

Examples:

* Diagnose the device
* Obtain manager approval
* Install software
* Replace hardware
* Verify with the user

### Important rules

* A ticket may contain many tasks.
* Tasks may be assigned independently.
* A ticket should not close while required tasks remain incomplete.
* Task completion must be auditable.

---

## Comment

Represents communication related to a ticket.

Comment types include:

* Public reply
* Internal note
* System-generated message

### Important rules

* Employees cannot view internal notes.
* Comments should not be permanently edited without history.
* Deleted comments should retain an audit record.
* System messages must be visually distinguishable.

---

## Attachment

Represents a file attached to a ticket, comment, asset or knowledge article.

Examples:

* Screenshot
* Log file
* Invoice
* Warranty document
* Error report

### Important rules

* File type and size must be validated.
* Files must be scanned or isolated before access.
* Access must follow the parent record's permissions.
* Sensitive files must not be publicly accessible.

---

## Category

Represents the classification of a ticket.

Examples:

* Hardware
* Software
* Network
* Security
* Access
* Email
* Printing

### Important rules

* Categories may be hierarchical.
* Categories may route tickets to specific teams.
* Categories may trigger different diagnostic questions.
* Categories should be deactivated rather than deleted.

---

## Support Team

Represents a group responsible for handling specific work.

Examples:

* Service Desk
* Network Support
* Infrastructure
* Application Support
* Security Operations

### Important rules

* A team can have many technicians.
* A technician can belong to multiple teams.
* Tickets may be assigned to a team before an individual.
* Teams may own categories and services.

---

## Service-Level Agreement

Represents a time-based service commitment.

Examples:

* Critical incident response within 15 minutes
* High-priority resolution within 4 hours
* Standard request completion within 3 working days

### Main responsibilities

* Defines response targets
* Defines resolution targets
* Tracks breaches
* Supports escalation

### Important rules

* SLA calculations must consider business hours.
* Paused statuses may suspend SLA timers.
* SLA policies may differ by priority, service or department.
* Breaches must be recorded even if the ticket is later completed.

---

# Asset Management Entities

## Asset

Represents any company-owned or managed resource.

Asset types include:

* Laptop
* Desktop computer
* Server
* Printer
* Monitor
* Mobile device
* Network equipment
* Software licence
* Peripheral

### Main responsibilities

* Stores ownership and assignment
* Tracks lifecycle
* Links support history
* Tracks warranty and vendor information
* Tracks operational status

### Important rules

* Every asset has a unique asset tag.
* Serial numbers should be unique when available.
* Assets should be retired rather than deleted.
* Assignment changes must be recorded.
* Ticket history must remain linked after retirement.

---

## Device

Represents an asset capable of reporting technical and health information.

Examples:

* Laptop
* Desktop
* Server
* Mobile phone

### Additional information

* Hostname
* IP address
* MAC address
* Operating system
* Storage
* Memory
* Processor
* Encryption status
* Antivirus status
* Last check-in
* Health score

### Important rules

* A device extends the asset concept.
* Device data may come from manual entry or an agent.
* Health information should include collection timestamps.
* Old telemetry must not overwrite newer information.

---

## Asset Assignment

Represents the relationship between an asset and a user, department or location.

### Important rules

* An asset may have many historical assignments.
* Only one active primary assignment should exist at a time.
* Start and end dates must be recorded.
* Reassignment must preserve history.

---

## Software Product

Represents an application used by the organisation.

Examples:

* Microsoft 365
* Adobe Acrobat
* Visual Studio Code
* SAP client

### Important rules

* A product may have many versions.
* A product may be installed on many devices.
* A product may require one or more licences.
* Unsupported versions should be identifiable.

---

## Software Installation

Represents software installed on a device.

### Important rules

* Installation records must identify product and version.
* Discovery date and last-seen date should be recorded.
* Removed software should retain historical records.
* Software installations may be linked to incidents.

---

## Licence

Represents the right to use a software product or service.

### Main responsibilities

* Tracks purchased quantity
* Tracks assigned quantity
* Tracks renewal date
* Tracks cost
* Tracks vendor
* Detects over-allocation

---

## Vendor

Represents a supplier, manufacturer or service provider.

Examples:

* Dell
* Microsoft
* Internet service provider
* Local hardware supplier

### Main responsibilities

* Stores contact information
* Links assets and licences
* Stores contract details
* Supports warranty and renewal tracking

---

# Knowledge Management Entities

## Knowledge Article

Represents reusable support knowledge.

Article types include:

* Troubleshooting guide
* How-to guide
* Known error
* Internal procedure
* User guide
* Resolution article

### Main responsibilities

* Documents repeatable solutions
* Supports self-service
* Supports technician recommendations
* Links to resolved incidents

### Important rules

* Articles have draft, review, published and archived states.
* Articles may have an expiry or review date.
* Published articles require version history.
* Internal articles may be restricted to technicians.

---

## Diagnostic Flow

Represents a structured set of questions used to collect useful troubleshooting information.

Example:

```text
Network problem
    ↓
Connection type?
    ↓
Wi-Fi
    ↓
Can other websites be reached?
    ↓
Are nearby users affected?
```

### Main responsibilities

* Guides users through reporting
* Collects structured evidence
* Suggests categories and priority
* Reduces incomplete tickets

### Important rules

* Questions may depend on previous answers.
* Diagnostic flows may be linked to categories.
* Flow versions must be preserved.
* Historical tickets must retain the answers originally submitted.

---

## Diagnostic Response

Represents an answer provided during guided ticket creation.

### Important rules

* Responses belong to a ticket.
* Responses must record the question version.
* Responses may be used for recommendations.
* Sensitive answers require appropriate access controls.

---

# Intelligence Entities

## Recommendation

Represents a system-generated suggestion.

Examples:

* Suggested category
* Suggested priority
* Suggested support team
* Suggested knowledge article
* Possible duplicate incident
* Likely root cause

### Important rules

* Every recommendation must include reasoning.
* Every recommendation should include confidence.
* Recommendations are advisory unless explicitly automated.
* User acceptance or rejection must be recorded.
* Recommendation logic must be versioned.

---

## Incident Cluster

Represents a group of related tickets that may share one underlying cause.

Example:

```text
Eight users at the Johannesburg office report Outlook connectivity failures within 20 minutes.
```

### Important rules

* Tickets may be added or removed from a cluster.
* A cluster may become a major incident.
* Correlation evidence must be stored.
* Technicians must be able to override the grouping.

---

## Known Problem

Represents an identified underlying cause that may generate multiple incidents.

Examples:

* Faulty Wi-Fi driver
* Repeated printer firmware failure
* Unsupported software version

### Important rules

* One known problem may relate to many incidents.
* A workaround may exist before a permanent fix.
* Root cause analysis should be stored.
* Known problems may produce knowledge articles.

---

## Health Signal

Represents a technical measurement or event reported by a device or monitoring integration.

Examples:

* Low disk space
* Antivirus outdated
* Failed update
* High CPU usage
* Device offline
* Battery degradation

### Important rules

* Every signal must include a timestamp and source.
* Signals may trigger alerts.
* Duplicate signals should be consolidated.
* Signals may be linked to incidents.

---

## Alert

Represents a condition requiring attention.

Examples:

* Warranty expires soon
* Critical device offline
* Repeated authentication failures
* SLA breach risk
* Licence over-allocation

### Important rules

* Alerts have severity and status.
* Alerts may create incidents or tasks.
* Alerts must support acknowledgement.
* Alert history must be retained.

---

# Governance Entities

## Audit Event

Represents a record of an important action.

Examples:

* User role changed
* Ticket reassigned
* Internal note viewed
* Asset retired
* Ticket priority overridden
* User account deactivated

### Important rules

* Audit events are append-only.
* Audit events must record actor, action, target and time.
* Sensitive changes should record before and after values.
* Audit events must not be editable through the application.

---

## Status History

Represents the lifecycle history of a record.

### Important rules

* Status changes must preserve previous and new values.
* The user responsible for the change must be recorded.
* Automated changes must identify the system process.
* Timestamps must be stored in UTC.

---

## Approval

Represents a formal decision required before work continues.

Examples:

* Manager approves software access
* Finance approves equipment purchase
* Security approves privileged access

### Important rules

* Approvals must identify the approver.
* Approval decisions must be timestamped.
* Rejections require a reason.
* Completed decisions should not be overwritten.

---

# Key Relationships

```text
Organisation
├── Departments
├── Locations
├── Users
├── Support Teams
├── Assets
├── Tickets
└── Knowledge Articles
```

```text
User
├── belongs to Department
├── works at Location
├── has Roles
├── owns or uses Assets
├── reports Tickets
├── is assigned Tickets
└── writes Comments
```

```text
Ticket
├── may be an Incident
├── may be a Service Request
├── belongs to a Reporter
├── may be requested for another User
├── may relate to Assets
├── may relate to a Location
├── is assigned to a Team
├── may be assigned to a Technician
├── contains Tasks
├── contains Comments
├── contains Attachments
├── has Status History
├── has SLA records
└── may receive Recommendations
```

```text
Asset
├── belongs to an Organisation
├── has Assignment History
├── may be assigned to a User
├── may be located at a Location
├── may contain Software Installations
├── may produce Health Signals
├── may have Alerts
└── may be linked to Tickets
```

```text
Incident
├── may belong to an Incident Cluster
├── may relate to a Known Problem
├── may produce a Knowledge Article
└── may have many affected Users and Assets
```

---

# Entity Lifecycle Principles

## Do not delete important history

The following records should normally be deactivated, retired or archived:

* Users
* Departments
* Locations
* Assets
* Categories
* Support teams
* Knowledge articles

## Preserve operational evidence

The following records should be append-only or strongly protected:

* Audit events
* Status history
* Approval decisions
* Assignment history
* Recommendation feedback
* SLA breaches

## Separate active state from history

The platform must store both:

* The current state
* The history of how that state changed

This is essential for auditing, troubleshooting, reporting and trust.

---

# Initial Version 1 Scope

The full domain model represents the long-term platform.

Version 1 will implement:

* Organisation
* User
* Role
* Permission
* Department
* Location
* Ticket
* Incident
* Service Request
* Task
* Comment
* Category
* Support Team
* Asset
* Device
* Asset Assignment
* Status History
* Audit Event

Later versions will add:

* Diagnostic Flow
* Knowledge Article
* Recommendation
* Incident Cluster
* Known Problem
* Software and licences
* Device health signals
* Alerts
* Advanced SLA management

---

# Design Principle

ResolveIQ should not treat tickets as isolated records.

Every ticket should become part of a connected operational history involving:

* The user
* Their department
* Their location
* Their devices
* The affected service
* Previous incidents
* Known solutions
* Support decisions
* Final resolution

This connected context is the foundation of the platform.
