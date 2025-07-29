// Environment configuration utility
const config = {
    // API Configuration
    apiBaseUrl:
        process.env.REACT_APP_API_BASE_URL || 'https://api.aiclinic.bio',

    // App Configuration
    appName: process.env.REACT_APP_APP_NAME || 'AIClinic',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',

    // Feature Flags
    isDevelopment: process.env.REACT_APP_ENVIRONMENT === 'development',
    isProduction: process.env.REACT_APP_ENVIRONMENT === 'production',

    // API Endpoints
    endpoints: {
        health: '/health',
        chat: '/api/chat',
        symptomAssessment: '/api/symptom-assessment',
        diseaseGuidelines: '/api/disease-guidelines',
    },

    // Timeouts and Limits
    apiTimeout: 30000, // 30 seconds
    retryAttempts: 3,
    connectionCheckInterval: 30000, // 30 seconds

    // UI Configuration
    maxMessageLength: 1000,
    typingDelay: 100,

    // Get full API URL
    getApiUrl: (endpoint = '') => {
        const baseUrl = config.apiBaseUrl.replace(/\/$/, ''); // Remove trailing slash
        const cleanEndpoint = endpoint.startsWith('/')
            ? endpoint
            : `/${endpoint}`;
        return `${baseUrl}${cleanEndpoint}`;
    },

    // Validation
    validate: () => {
        const errors = [];

        if (!config.apiBaseUrl) {
            errors.push('REACT_APP_API_BASE_URL is required');
        }

        try {
            new URL(config.apiBaseUrl);
        } catch (e) {
            errors.push('REACT_APP_API_BASE_URL must be a valid URL');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },
};

// Validate configuration on load
const validation = config.validate();
if (!validation.isValid) {
    console.error('Configuration validation failed:', validation.errors);
}

// Log configuration in development
if (config.isDevelopment) {
    console.log('App Configuration:', {
        apiBaseUrl: config.apiBaseUrl,
        environment: config.environment,
        version: config.version,
    });
}

export default config;
