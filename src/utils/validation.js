import { users } from "../config/users";

export function validateAccount(values) {
  const isMatched = users.filter((user) => {
    if (user.email === values.email && user.password === values.password) {
      return user;
    }

    return null;
  });

  return isMatched.length;
}
