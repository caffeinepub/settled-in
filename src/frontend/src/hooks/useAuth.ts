import { useInternetIdentity } from "./useInternetIdentity";

/**
 * Convenience auth hook that wraps useInternetIdentity
 * and exposes a clean interface for components.
 */
export function useAuth() {
  const {
    identity,
    login,
    clear,
    isLoggingIn,
    isLoginSuccess,
    isInitializing,
  } = useInternetIdentity();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const principal = isAuthenticated
    ? identity!.getPrincipal().toString()
    : null;

  return {
    isAuthenticated,
    isLoggingIn,
    isInitializing,
    isLoginSuccess,
    login,
    logout: clear,
    principal,
    identity,
  };
}
