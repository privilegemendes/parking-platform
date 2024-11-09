import { z } from "zod";

// DTO Schemas
export const loginWithPasswordDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const userDto = z.object({
  id: z.string(),
  email: z.string().email({ message: "Invalid email format" }),
});

export const authDto = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
});

export const userResponse = z.object({
  user: userDto,
  auth: authDto,
});

export type LoginWithPasswordDto = z.infer<typeof loginWithPasswordDto>;
export type UserDto = z.infer<typeof userDto>;
export type AuthDto = z.infer<typeof authDto>;
export type UserResponse = z.infer<typeof userResponse>;
