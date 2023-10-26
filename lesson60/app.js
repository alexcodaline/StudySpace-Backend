import fs from "fs";
import os from "os";
import path from "path";

const { promises } = fs;

const users = [
  { name: "Mike", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Nikola", age: 17 },
];

const dataUsers = { users: users };
// const usersJson = JSON.stringify(dataUsers);

// fs.writeFile("data.json", usersJson, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Data written to file");
//   }
// });
// завдання 2
const homeDir = os.homedir();
const homeFilePath = path.join(homeDir, "data.json");
const currentFilePath = path.join(process.cwd(), "data.json");
console.log("Home directory: " + homeFilePath);
console.log("Current directory: " + currentFilePath);

// завдання 3-4-5
const newData = [
  { name: "Anna", age: 24 },
  { name: "Tom", age: 52 },
];

const isExist = async (homeFilePath) => {
  try {
    await promises.stat(homeFilePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      throw error;
    }
  }
};
isExist(homeFilePath)
  .then((exists) => {
    if (exists) {
      return promises.readFile(homeFilePath, "utf-8");
    } else {
      return promises.writeFile(
        homeFilePath,
        JSON.stringify({ users: newData })
      );
    }
  })
  .then((data) => {
    const parseData = JSON.parse(data);
    parseData.users = parseData.users.filter(
      (user) => !newData.some((newUser) => newUser.name === user.name)
    );
    parseData.users = parseData.users.concat(newData);
    const updatedJsonData = JSON.stringify(parseData);

    return Promise.all([
      promises.writeFile(homeFilePath, updatedJsonData),
      promises.writeFile(currentFilePath, updatedJsonData),
    ]);
  })
  .then(() => {
    console.log("Data written to file");
  })
  .catch((err) => {
    console.error(err);
  });
