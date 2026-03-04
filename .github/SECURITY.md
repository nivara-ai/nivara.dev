# Security Policy

## Supported Versions

Security updates are provided for the latest production version on `main`.

| Version | Supported |
| --- | --- |
| Latest (`main`) | :white_check_mark: |
| Older releases | :x: |

## Reporting a Vulnerability

Please do not open public issues for security vulnerabilities.

Use one of these channels:

1. GitHub Security Advisory (preferred):
   - Go to the repository Security tab and create a private vulnerability report.
2. Email:
   - security@nivara.dev

Please include:

- Affected endpoint/page/component
- Reproduction steps or proof of concept
- Impact assessment
- Suggested remediation (if available)

## Response Targets

- Initial triage response: within 3 business days
- Remediation timeline: based on severity and exploitability
- Coordinated disclosure after fix verification

## Scope

In scope:

- Authentication and authorization bypass
- Sensitive data exposure
- Privilege escalation
- Injection vulnerabilities
- Supply-chain and dependency risks impacting production

Out of scope unless chained with a real impact:

- Missing best-practice headers with no exploit path
- Clickjacking on non-sensitive views
- Rate-limit suggestions without demonstrated abuse scenario
