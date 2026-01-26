import { Component } from 'react';

import type {
    ErrorBoundaryProps,
    ErrorBoundaryState,
} from './ErrorBoundary.types';

/**
 * **ErrorBoundary**
 *
 * A reusable React Error Boundary component that catches JavaScript errors
 * in its child component tree and displays a fallback UI instead of crashing the entire app.
 *
 * @example
 * ```tsx
 * const Fallback = () => (
 *     <h2>Something went wrong!</h2>
 * );
 *
 * <ErrorBoundary fallback={<Fallback/>}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
