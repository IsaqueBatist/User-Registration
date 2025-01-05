import { getUserByEmail } from "../services/userService.ts"
import { UserType } from "../types/user.ts";

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const data: UserType[] = await getUserByEmail(email);
  return !data.length
}
