import type {UserID, User} from "MyTypes";

function getUserID(user: User): UserID {
	return user.id;
}