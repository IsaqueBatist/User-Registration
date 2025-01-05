import { UserType } from "../types/user"

export interface UserRegistrationFormProps{
  user: UserType
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType>>
}
