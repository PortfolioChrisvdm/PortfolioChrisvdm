# ResolveIQ Product Decisions

## Purpose

This document records important product decisions that affect the architecture, permissions, data model, and long-term direction of ResolveIQ.

---

# Supported Applications

ResolveIQ will be designed as a platform rather than a single web application.

## Web Application

The web application will be the primary Version 1 interface.

It will support:

* Employees
* Technicians
* Managers
* Administrators
* Asset managers
* Auditors

The web application will provide the complete ResolveIQ feature set.

## Desktop Application

A desktop application is planned for a later release.

Possible desktop-specific capabilities include:

* System tray notifications
* Faster access to assigned cases
* Local device information
* Technician utilities
* Secure integration with the Windows agent
* Offline or limited-connectivity support

The desktop application should consume the same public API as the web application.

## Mobile Application

A compact mobile application is planned.

It will focus on high-value mobile workflows rather than reproducing every desktop feature.

Possible mobile features include:

* Create a case
* Add comments
* Upload photographs
* View assigned cases
* Approve requests
* Receive notifications
* Update case status
* Scan asset QR codes

Complex administration and reporting will remain primarily web-based.

## Public API

ResolveIQ will expose a versioned API.

The API will support:

* First-party applications
* External integrations
* Automation
* Reporting
* Future partner applications
* Device and monitoring integrations

All user interfaces must rely on application APIs rather than bypassing business rules.

## Command-Line Interface

A CLI is planned for administrators, technicians, automation, and development workflows.

Possible commands include:

```text
resolveiq cases list
resolveiq cases assign
resolveiq assets import
resolveiq users deactivate
resolveiq diagnostics run
resolveiq system health
```

The CLI must use the same authenticated application API and permission model as other clients.

## Windows Agent

A Windows agent remains under consideration.

Potential responsibilities include:

* Automatic device discovery
* Hardware inventory collection
* Operating-system information
* Installed-software discovery
* Storage and memory health
* Encryption status
* Antivirus status
* Update status
* Last logged-in user
* Device heartbeat
* Diagnostic collection

The agent will not be included in the first release.

The architecture must leave room for secure agent registration and telemetry ingestion later.

---

# Asset Creation and Discovery

ResolveIQ will support both automatic discovery and manual asset creation.

## Automatic Discovery

Automatic discovery is the preferred method for supported devices.

Discovered information may include:

* Hostname
* Serial number
* Manufacturer
* Model
* Operating system
* MAC addresses
* Processor
* Memory
* Storage
* Installed software
* Encryption status
* Security status
* Last check-in

Each discovered value must include:

* Source
* Collection time
* Confidence or verification state where relevant
* Agent or integration responsible for collecting it

## Manual Creation

Assets may also be created manually.

Manual entry is necessary for:

* Non-networked equipment
* Monitors
* Peripherals
* Spare hardware
* Assets awaiting deployment
* Devices not yet connected to an agent
* Historical records

Manually entered information may contain identification errors.

ResolveIQ should therefore distinguish between:

* Manually entered data
* Automatically discovered data
* Administrator-verified data

## Duplicate Detection

The system should attempt to detect possible duplicate assets using:

* Serial number
* Asset tag
* Hostname
* MAC address
* Manufacturer and model
* Existing assignment

Possible duplicates should be presented for review rather than merged automatically without confirmation.

---

# Multiple Department Membership

A user may belong to zero, one, or multiple departments.

Examples:

* A technician may support both Networking and Hardware.
* A manager may oversee two departments.
* A project employee may temporarily work across departments.
* A transferred employee may retain historical records from a previous department.

## Primary Department

A user may have one primary department.

The primary department may be used for:

* Default reporting
* Organisational charts
* Manager relationships
* Case-routing suggestions
* User profile display

A primary department is optional.

## Additional Departments

Administrators may assign users to additional departments.

Each membership should include:

* Membership UUID
* User UUID
* Department UUID
* Membership type
* Start date
* End date
* Active status
* Assigned by
* Reason or notes where relevant

## Department Membership History

Department changes must preserve history.

When a user transfers departments, the previous membership is ended rather than overwritten.

Example:

```text
John Smith

Networking
Start: 2025-01-10
End: 2026-03-31

Hardware Support
Start: 2026-04-01
End: Active
```

The user retains access to historical cases according to permissions and the rules that applied to those records.

---

# Department Case Access

Department membership and case access are related but must not be treated as identical.

A user may see a case because they are:

* The case reporter
* The person the case was submitted for
* The assigned technician
* A member of the assigned support team
* A manager with appropriate permission
* An administrator
* An explicitly added participant
* A historical participant with permitted read access

Department membership alone must not automatically grant unrestricted access to every department case.

This prevents accidental exposure of sensitive information.

Examples of restricted cases include:

* Human Resources matters
* Security incidents
* Executive support
* Payroll issues
* Privileged-access requests

---

# Core Case Model

ResolveIQ will use `Case` as the internal parent concept.

The user interface will continue to display familiar service-management terms.

```text
Case
├── Incident
├── Service Request
├── Change Request
└── Problem
```

## Case

A Case stores information common to all tracked operational work.

Common information includes:

* Case UUID
* Case reference number
* Type
* Title
* Description
* Status
* Priority
* Reporter
* Requested-for user
* Assigned support team
* Assigned technician
* Related departments
* Related assets
* Related services
* Created date
* Updated date
* Resolution date
* Closure date

## Incident

Represents an unplanned interruption or degradation of service.

## Service Request

Represents a request for a standard product, service, access, or fulfilment action.

## Change Request

Represents a planned modification to infrastructure, software, configuration, or service.

## Problem

Represents an underlying cause responsible for one or more incidents.

---

# Case Editing Permissions

A case may be edited only by authorised users.

Default edit access includes:

* The user who created the case
* The currently assigned technician
* Authorised administrators
* Authorised managers or team members where explicitly permitted

Unrelated employees and unrelated technicians must not be allowed to edit the case.

## Field-Level Rules

Not every authorised user may edit every field.

For example:

### Reporter may edit

* Title
* Description
* Contact information
* Public attachments
* Additional troubleshooting information

### Assigned technician may edit

* Status
* Priority
* Assignment
* Category
* Technical diagnosis
* Resolution
* Internal notes
* Related assets

### Administrator may edit

* Administrative metadata
* Ownership
* Permissions
* Recovery of incorrectly closed or assigned cases

Sensitive fields may become locked after resolution or closure.

---

# Case Edit History

Every meaningful change must create an edit-history record.

The history record should include:

* History UUID
* Case UUID
* Actor UUID
* Timestamp
* Field changed
* Previous value
* New value
* Change reason where required
* Request or correlation ID
* Source application
* IP address where appropriate

Example:

```text
Case: INC-2026-00421
Changed by: User UUID
Field: priority
Previous value: medium
New value: high
Reason: Payroll processing is blocked
Timestamp: 2026-07-10T09:42:00Z
```

Case history must be append-only.

Existing history records must never be silently edited.

---

# Comment Deletion

Technicians may delete comments when they have the required permission.

Deletion requires:

* User UUID of the person deleting the comment
* Timestamp
* Reason for deletion
* Original author UUID
* Original comment content or protected snapshot
* Case UUID
* Comment UUID

## Logical Deletion

Comments should normally be logically deleted rather than physically removed.

The active interface may display:

```text
This comment was removed by an authorised technician.

Reason: Sensitive password information was included.
```

The original content remains protected in the audit history for authorised review.

This approach supports:

* Accountability
* Security investigations
* Compliance
* Recovery from accidental deletion

Employees must not automatically be able to view protected deleted content.

---

# Asset Deletion

Administrators may remove assets when they have the required permission.

However, operational assets should normally be logically deleted, archived, merged, or retired rather than physically erased.

Deletion or removal requires:

* Administrator UUID
* Asset UUID
* Timestamp
* Reason
* Previous asset state
* Related assignments
* Related cases
* Request or correlation ID

Possible removal actions include:

* Retire asset
* Archive asset
* Mark as duplicate
* Merge duplicate asset
* Mark as disposed
* Mark as lost or stolen
* Delete invalid test record

## Physical Deletion

Permanent physical deletion should only be allowed for records that:

* Were created accidentally
* Contain no required historical relationships
* Are not linked to cases or assignments
* Do not need to be retained for audit or compliance

Permanent deletion must require elevated permission and explicit confirmation.

---

# Audit Requirements

The following actions must be audited:

* Case created
* Case edited
* Case assigned
* Case status changed
* Case priority changed
* Case deleted or archived
* Comment created
* Comment edited
* Comment deleted
* Asset created
* Asset discovered
* Asset updated
* Asset reassigned
* Asset retired
* Asset deleted
* Department membership added
* Department membership ended
* User role changed
* Permission changed

Audit records must identify:

* Who performed the action
* What action was performed
* Which record was affected
* When it occurred
* Why it occurred where required
* What changed
* Which application or integration initiated it

---

# Architectural Consequences

These decisions require ResolveIQ to support:

* API-first application design
* Shared authentication across clients
* Permission-based access control
* Many-to-many user and department relationships
* Historical department membership
* Case participant and support-team access rules
* Append-only audit records
* Logical deletion
* Field-level edit permissions
* Source-aware asset data
* Duplicate asset detection
* Future agent registration and telemetry ingestion

These requirements must be reflected in the database schema and backend architecture before implementation begins.
