import { UserType } from "../types/user";

export interface UserListProps {
  onUserSelect: (user: UserType) => void,
}
