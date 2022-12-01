const fs = require("fs").promises;

const makeNewId = (contactsData) => {
  const newMaxId =
    contactsData.reduce((maxId, { id }) => {
      const currId = parseInt(id);

      if (currId <= maxId) {
        return maxId;
      }

      return currId;
    }, 0) + 1;

  return newMaxId.toString();
};

const readContactsData = async (path) => {
  try {
    const fileData = await fs.readFile(path);
    return JSON.parse(fileData.toString());
  } catch (error) {
    console.warn("\x1B[31m " + error);
    return { error };
  }
};

const writeContactsData = async (path, dataToWrite) => {
  try {
    fs.writeFile(path, JSON.stringify(dataToWrite));
  } catch (error) {
    console.warn("\x1B[31m " + error);
    return { error };
  }
};

module.exports = { makeNewId, readContactsData, writeContactsData };
