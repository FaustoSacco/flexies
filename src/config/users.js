export const users = [
  {
    name: "Fausto",
    email: "fausto@flexies.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Ben",
    email: "ben@flexies.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Gary",
    email: "gary@flexies.com",
    password: "password123",
    role: "user",
  },
];

export function validateAccount(values) {
  const isMatched = users.filter((user) => {
    if (user.email === values.email && user.password === values.password) {
      return user;
    }

    return null;
  });

  return isMatched.length;
}
