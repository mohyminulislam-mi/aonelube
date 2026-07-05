import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

/**
 * Returns whether the current user's account is approved.
 *
 * - Returns `true`  for customers (always approved) and approved managers.
 * - Returns `false` for managers whose accounts are pending admin approval.
 * - Returns `null`  when there is no logged-in user.
 *
 * Usage:
 *   const isApproved = useIsApproved();
 */
export function useIsApproved() {
  const { user } = useAuth();
  if (!user) return null;
  // Customers are always considered approved; only managers have an approval gate.
  if (user.role !== "manager") return true;
  return user.isApproved === true;
}
