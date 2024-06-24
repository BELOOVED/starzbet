const ALLOWED_EMAIL_PROVIDERS = process.env.ALLOWED_EMAIL_PROVIDERS;

const listAllowedEmailProviders = ALLOWED_EMAIL_PROVIDERS ? ALLOWED_EMAIL_PROVIDERS.split(",") : [];

export { listAllowedEmailProviders };
