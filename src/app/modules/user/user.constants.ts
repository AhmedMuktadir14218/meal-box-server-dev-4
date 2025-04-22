export const USER_ROLE = {
  provider: "provider",
  customer: "customer",
  admin: "admin"
} as const;

export type UserRole = keyof typeof USER_ROLE;