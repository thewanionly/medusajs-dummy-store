import '@testing-library/jest-dom';

process.env.MEDUSA_BACKEND_URL = 'http://localhost:9000';
process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = 'pk_test';
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:8000';
process.env.NEXT_PUBLIC_DEFAULT_REGION = 'test';
process.env.NEXT_PUBLIC_STRIPE_KEY = 'test';
process.env.REVALIDATE_SECRET = 'test';
