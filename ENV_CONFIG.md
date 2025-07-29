# Environment Configuration

This project uses different environment files for different deployment scenarios.

## Environment Files

### `.env` (committed)

-   Default/fallback environment variables
-   Safe values that can be public
-   Used when no other env file is found

### `.env.local` (not committed)

-   Local development overrides
-   Your personal development settings
-   Overrides values from `.env`

### `.env.production` (committed)

-   Template for production environment
-   Used by CI/CD as a reference
-   Should contain production-safe defaults

## Setup Instructions

### For Local Development

1. Copy `.env.production` to `.env.local`
2. Modify `.env.local` with your local settings
3. Your `.env.local` will automatically override `.env` values

### For CI/CD Pipeline

Set these environment variables in your CI/CD system:

```bash
REACT_APP_API_BASE_URL=https://api.aiclinic.bio
REACT_APP_APP_NAME=AIClinic
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
```

## Environment Variables

| Variable                 | Description      | Default                 |
| ------------------------ | ---------------- | ----------------------- |
| `REACT_APP_API_BASE_URL` | Backend API URL  | `http://localhost:8000` |
| `REACT_APP_APP_NAME`     | Application name | `AIClinic`              |
| `REACT_APP_VERSION`      | App version      | `1.0.0`                 |
| `REACT_APP_ENVIRONMENT`  | Environment type | `development`           |

## CI/CD Configuration Examples

### GitHub Actions

```yaml
env:
    REACT_APP_API_BASE_URL: https://api.aiclinic.bio
    REACT_APP_ENVIRONMENT: production
```

### Docker

```dockerfile
ARG REACT_APP_API_BASE_URL=https://api.aiclinic.bio
ARG REACT_APP_ENVIRONMENT=production
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV REACT_APP_ENVIRONMENT=$REACT_APP_ENVIRONMENT
```

### Vercel/Netlify

Add environment variables in your deployment platform's dashboard:

-   `REACT_APP_API_BASE_URL` = `https://api.aiclinic.bio`
-   `REACT_APP_ENVIRONMENT` = `production`
