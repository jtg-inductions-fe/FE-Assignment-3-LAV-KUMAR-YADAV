import { ErrorBoundary } from '@/components';
import { ErrorFallback, SignUp as SignUpContainer } from '@/containers';

/**
 * Allows new users to register by submitting their details.
 */
export const SignUp = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <SignUpContainer />
    </ErrorBoundary>
);
