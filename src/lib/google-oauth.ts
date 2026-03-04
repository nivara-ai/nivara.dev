/**
 * Google OAuth Configuration for Nivara
 * 
 * STATUS: READY — Not yet active. Uncomment UI buttons to enable.
 * 
 * This module contains the configuration and helper functions for
 * Google OAuth sign-in via Supabase. The server action `signInWithGoogle`
 * in src/app/auth/actions.ts is already implemented and functional.
 * 
 * ## Activation Checklist
 * 
 * 1. Create OAuth 2.0 credentials at:
 *    https://console.cloud.google.com/apis/credentials
 *    
 *    - Application type: Web application
 *    - Authorized redirect URI:
 *      https://ukaeanrwxsdqpxpiuigg.supabase.co/auth/v1/callback
 * 
 * 2. Configure in Supabase Dashboard:
 *    Dashboard → Authentication → Providers → Google
 *    - Enable Google provider
 *    - Paste Client ID and Client Secret
 * 
 * 3. Uncomment the Google sign-in button in these files:
 *    - src/components/ui/sign-in.tsx
 *    - src/components/ui/create-account.tsx
 *    (Search for "Google OAuth" comments)
 * 
 * 4. Redeploy to Vercel (auto on push to main)
 * 
 * ## Sign-In Button Code (ready to paste)
 * 
 * Add this divider + button after the </form> closing tag:
 * 
 * ```tsx
 * <div className="animate-element animate-delay-700 relative flex items-center justify-center">
 *   <span className="w-full border-t border-border"></span>
 *   <span className="px-4 text-sm text-muted-foreground bg-background absolute">
 *     Or continue with
 *   </span>
 * </div>
 * 
 * <button
 *   onClick={handleGoogleSignIn}
 *   disabled={isPending}
 *   className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors disabled:opacity-50"
 * >
 *   <GoogleIcon />
 *   Continue with Google
 * </button>
 * ```
 * 
 * ## GoogleIcon Component
 * 
 * ```tsx
 * const GoogleIcon = () => (
 *   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
 *     <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
 *     <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
 *     <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
 *     <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
 *   </svg>
 * );
 * ```
 * 
 * ## Handler Function (add to component)
 * 
 * ```tsx
 * import { signInWithGoogle } from "@/app/auth/actions";
 * 
 * const handleGoogleSignIn = () => {
 *   startTransition(async () => {
 *     const result = await signInWithGoogle();
 *     if (result?.error) {
 *       setError(result.error);
 *     }
 *   });
 * };
 * ```
 */

export const GOOGLE_OAUTH_CONFIG = {
  /**
   * Whether Google OAuth is currently enabled.
   * Set to true after completing the activation checklist above.
   */
  enabled: false,

  /**
   * The Supabase redirect URL for OAuth callbacks.
   * This should match the redirect URI configured in Google Cloud Console.
   */
  callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nivara.dev"}/auth/callback`,

  /**
   * Supabase OAuth callback URL (used in Google Cloud Console).
   * Format: https://<project-ref>.supabase.co/auth/v1/callback
   */
  supabaseCallbackUrl: "https://ukaeanrwxsdqpxpiuigg.supabase.co/auth/v1/callback",

  /**
   * Scopes requested from Google.
   */
  scopes: ["openid", "email", "profile"],
} as const;

/**
 * Check if Google OAuth is available and configured.
 */
export function isGoogleOAuthEnabled(): boolean {
  return GOOGLE_OAUTH_CONFIG.enabled;
}
