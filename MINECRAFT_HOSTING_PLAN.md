# Minecraft Server Hosting Website Specification

## 1. Purpose
Build a full-stack Next.js website that lets authenticated users start and manage a Minecraft Java Edition server on AWS.

The app should:
- log users in with AWS Cognito
- start an EC2 instance that runs the Minecraft server
- show the current server address after launch
- automatically stop the server after 15 minutes of inactivity

## 2. Product Scope
### In scope
- User login and logout
- Protected dashboard
- Start server button
- Live server status display
- Current public IP or public DNS display
- Automatic idle shutdown
- Basic error and loading states

### Out of scope for first version
- Server marketplaces or payments
- Multiplayer account linking
- Server backups/restores UI
- Instance customization per user
- Multi-region deployment

## 3. Recommended Stack
- Frontend: Next.js App Router + React
- Authentication: AWS Cognito User Pool
- Backend: Next.js route handlers
- Compute: AWS EC2
- Server state storage: DynamoDB or SSM Parameter Store
- Metrics and shutdown triggers: CloudWatch + Lambda
- Optional infra automation: AWS CDK or Terraform

## 4. User Experience
### Public pages
- Landing page explaining the service
- Login button
- Basic feature overview

### Authenticated pages
- Dashboard
- Start server button
- Server status card
- Server address card
- Copy address button
- Last updated timestamp
- Logout button

### Dashboard states
- `Stopped`
- `Starting`
- `Running`
- `Stopping`
- `Error`

## 5. Core Flow
1. User signs in with Cognito.
2. User opens the dashboard.
3. User clicks `Start Server`.
4. Backend checks whether a server already exists.
5. If no server is running, backend starts EC2.
6. Backend polls until the instance has a public IP or DNS name.
7. UI updates with the address and running state.
8. Minecraft players connect to the server.
9. Server reports player count to CloudWatch.
10. If player count stays at 0 for 15 minutes, the server is stopped.

## 6. AWS Architecture
### Cognito
- Handles user sign-in and sign-out
- Issues JWTs for authenticated requests
- Stores user identities but not game server state

### Next.js app
- Serves the frontend
- Verifies user session/auth state
- Calls backend route handlers for server actions

### Route handlers
Suggested endpoints:
- `POST /api/server/start`
- `POST /api/server/stop`
- `GET /api/server/status`
- `GET /api/server/address`

### EC2 Minecraft host
- Runs Minecraft Java Edition
- Uses user data or an init script to install/start the server
- Publishes player activity metrics

### CloudWatch
- Stores custom player-count metric
- Evaluates idle condition
- Triggers shutdown workflow

### Lambda
- Stops the EC2 instance when idle threshold is met
- Optionally updates application state in DynamoDB/SSM

## 7. Dynamic Address Strategy
The server should not use a paid Elastic IP in the first version.

Use the instance's:
- public IPv4 address, or
- public DNS name

Because the address changes each time the instance starts, the dashboard should:
- fetch the latest address after startup
- display it clearly
- allow copying it to clipboard

If a stable hostname is needed later, Route 53 can update a DNS record on startup, but that introduces extra cost and setup.

## 8. Idle Shutdown Strategy
CloudWatch alone cannot reliably detect Minecraft player count unless the server publishes a metric.

Recommended approach:
1. Minecraft server or plugin sends online player count once per minute.
2. Metric is stored in CloudWatch as a custom metric.
3. CloudWatch alarm checks whether player count remains `0` for 15 minutes.
4. Alarm triggers Lambda.
5. Lambda calls `StopInstances` for the EC2 server.

Alternative approaches:
- RCON polling script
- Lightweight watchdog service on the instance
- Minecraft plugin with CloudWatch integration

Preferred option: plugin or watchdog script because it is reliable and simple to reason about.

## 9. Data Model
Suggested server metadata fields:
- `userId`
- `instanceId`
- `status`
- `publicIp`
- `publicDns`
- `lastStartedAt`
- `lastPlayerActivityAt`
- `lastUpdatedAt`

Suggested storage options:
- DynamoDB for structured state
- SSM Parameter Store for simple single-server state

## 10. Security Requirements
- Never expose AWS credentials to the browser
- Keep EC2 control actions server-side only
- Validate Cognito JWTs on protected requests
- Restrict IAM permissions to only what the app needs
- Limit one active server per user unless multi-server support is added later
- Log state transitions for auditing

## 11. Failure Handling
The app should handle:
- EC2 start failures
- instance boot timeouts
- missing public IP/DNS
- CloudWatch metric delays
- shutdown API failures
- stale UI state after refresh

Suggested UI behavior:
- show spinner while starting
- show retry message if startup fails
- refresh status automatically every few seconds while starting
- preserve last known status in storage

## 12. UI Components
Suggested Next.js components:
- `LandingHero`
- `LoginButton`
- `ServerStatusCard`
- `ServerAddressCard`
- `StartServerButton`
- `StopServerButton`
- `StatusBadge`
- `CopyButton`
- `SessionMenu`

## 13. Implementation Phases
### Phase 1: App foundation
- Create Next.js app
- Add routing and layout
- Add basic styling and dashboard shell

### Phase 2: Authentication
- Set up Cognito
- Add login/logout flow
- Protect dashboard routes

### Phase 3: Server control
- Implement start/status/stop API routes
- Connect routes to AWS SDK calls
- Store server metadata

### Phase 4: Address display
- Fetch instance public IP/DNS after startup
- Display the address in the dashboard
- Add copy-to-clipboard support

### Phase 5: Idle shutdown
- Add player-count reporting
- Configure CloudWatch alarm
- Stop instance after 15 minutes of no players

### Phase 6: Polish
- Improve loading and error states
- Add refresh polling
- Add basic audit logging

## 14. Cost Notes
- Elastic IP is not needed for this first version
- EC2 cost depends on instance uptime and size
- CloudWatch custom metrics may add a small cost
- A domain name is optional
- Route 53 is optional if you want a stable hostname later

## 15. Recommended First Version
- Next.js App Router
- Cognito Hosted UI
- One EC2 instance per server
- Dynamic public DNS/address display
- CloudWatch custom metric for player count
- Lambda-based idle shutdown

## 16. Open Questions
- Should one user be allowed to run only one server at a time?
- Should the server stop after idle, or also after a fixed maximum runtime?
- Should the app support password login, social login, or both in Cognito?
- Should server boot be fully automated with a custom AMI or handled by user data scripts?
