
import fs from "fs";
const getAllUsers = () => {
  if (!fs.existsSync("users.json")) {
    return [];
  }
  const users = JSON.parse(fs.readFileSync("users.json", "utf8"));
  // Omit password from each user
  return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
};

export { getAllUsers };