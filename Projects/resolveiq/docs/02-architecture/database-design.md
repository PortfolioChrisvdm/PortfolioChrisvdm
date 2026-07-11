# Database Design

## Overview

The Help Desk Ticket System uses a relational database.

The main entities are:

* Users
* Departments
* Categories
* Tickets
* Comments

These entities are connected using primary keys and foreign keys.

---

# Entity Relationships

```text
Department
    |
    | one-to-many
    v
User
    |
    | one-to-many
    v
Ticket
    |
    | one-to-many
    v
Comment
```

A category can also be assigned to many tickets.

```text
Category
    |
    | one-to-many
    v
Ticket
```

A technician is also a user. Tickets reference the assigned technician using a foreign key to the users table.

---

# Departments Table

Stores the departments within the organisation.

| Column      | Type         | Rules               |
| ----------- | ------------ | ------------------- |
| id          | UUID         | Primary key         |
| name        | VARCHAR(100) | Required and unique |
| description | TEXT         | Optional            |
| created_at  | TIMESTAMP    | Required            |
| updated_at  | TIMESTAMP    | Required            |

Examples:

* Information Technology
* Human Resources
* Finance
* Operations
* Sales

---

# Users Table

Stores employees, technicians and administrators.

| Column        | Type         | Rules               |
| ------------- | ------------ | ------------------- |
| id            | UUID         | Primary key         |
| first_name    | VARCHAR(100) | Required            |
| last_name     | VARCHAR(100) | Required            |
| email         | VARCHAR(255) | Required and unique |
| password_hash | VARCHAR(255) | Required            |
| role          | VARCHAR(20)  | Required            |
| department_id | UUID         | Foreign key         |
| is_active     | BOOLEAN      | Default true        |
| created_at    | TIMESTAMP    | Required            |
| updated_at    | TIMESTAMP    | Required            |

Allowed roles:

* employee
* technician
* administrator

The application must never store plain-text passwords. Only hashed passwords may be stored.

---

# Categories Table

Stores the available support ticket categories.

| Column      | Type         | Rules               |
| ----------- | ------------ | ------------------- |
| id          | UUID         | Primary key         |
| name        | VARCHAR(100) | Required and unique |
| description | TEXT         | Optional            |
| is_active   | BOOLEAN      | Default true        |
| created_at  | TIMESTAMP    | Required            |
| updated_at  | TIMESTAMP    | Required            |

Initial categories:

* Hardware
* Software
* Network
* Printer
* Email
* Security
* Other

---

# Tickets Table

Stores support requests submitted by employees.

| Column         | Type         | Rules                    |
| -------------- | ------------ | ------------------------ |
| id             | UUID         | Primary key              |
| ticket_number  | VARCHAR(30)  | Required and unique      |
| title          | VARCHAR(200) | Required                 |
| description    | TEXT         | Required                 |
| priority       | VARCHAR(20)  | Required                 |
| status         | VARCHAR(30)  | Required                 |
| category_id    | UUID         | Foreign key and required |
| created_by_id  | UUID         | Foreign key and required |
| assigned_to_id | UUID         | Foreign key and optional |
| resolved_at    | TIMESTAMP    | Optional                 |
| closed_at      | TIMESTAMP    | Optional                 |
| created_at     | TIMESTAMP    | Required                 |
| updated_at     | TIMESTAMP    | Required                 |

Allowed priorities:

* low
* medium
* high
* critical

Allowed statuses:

* open
* in_progress
* waiting_for_user
* resolved
* closed

The `created_by_id` column references the user who submitted the ticket.

The `assigned_to_id` column references the technician currently responsible for the ticket.

Example ticket number:

```text
HD-2026-000001
```

---

# Comments Table

Stores public ticket replies and private technician notes.

| Column      | Type      | Rules                    |
| ----------- | --------- | ------------------------ |
| id          | UUID      | Primary key              |
| ticket_id   | UUID      | Foreign key and required |
| author_id   | UUID      | Foreign key and required |
| content     | TEXT      | Required                 |
| is_internal | BOOLEAN   | Default false            |
| created_at  | TIMESTAMP | Required                 |
| updated_at  | TIMESTAMP | Required                 |

Employees may only view comments where `is_internal` is false.

Technicians and administrators may view internal notes.

---

# Relationships

## Department to Users

One department can contain many users.

Each user can belong to one department.

## User to Tickets

One user can create many tickets.

Each ticket is created by one user.

## Technician to Tickets

One technician can be assigned many tickets.

A ticket may be unassigned or assigned to one technician.

## Category to Tickets

One category can be used by many tickets.

Each ticket belongs to one category.

## Ticket to Comments

One ticket can have many comments.

Each comment belongs to one ticket.

## User to Comments

One user can write many comments.

Each comment is written by one user.

---

# Delete Rules

Departments should not be deleted while users are assigned to them.

Categories should normally be deactivated instead of deleted.

Deleting a ticket should also delete its comments.

Deleting a user should not automatically delete historical tickets or comments.

User accounts should normally be deactivated instead of permanently deleted.

---

# Indexes

Indexes should be created for frequently searched columns:

* users.email
* tickets.ticket_number
* tickets.status
* tickets.priority
* tickets.created_by_id
* tickets.assigned_to_id
* tickets.category_id
* tickets.created_at
* comments.ticket_id

---

# Future Tables

Later versions may add:

* Attachments
* Ticket History
* Service-Level Agreements
* Notifications
* Knowledge Base Articles
* Computer Assets
* Audit Logs
