import { z } from "zod";
export const CreateUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    passwordRaw: z.string().min(8, "Password must be at least 8 characters long"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    roles: z.array(z.string()).min(1, "At least one role is required").default(["USER"])
});
export const UpdateUserSchema = z.object({
    email: z.string().email("Invalid email format").optional(),
    passwordRaw: z.string().min(8, "Password must be at least 8 characters long").optional(),
    firstName: z.string().min(1, "First name must not be empty").optional(),
    lastName: z.string().min(1, "Last name must not be empty").optional(),
    roles: z.array(z.string()).optional()
});
export const UserIdSchema = z.object({
    id: z.string().uuid("Invalid user ID format")
});
//# sourceMappingURL=users.schemas.js.map