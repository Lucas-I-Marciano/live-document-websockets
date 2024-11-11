let usersList = [];

export function addUserDocument(user, document) {
  usersList.push({
    user,
    document,
  });
}

export function getUsersFromDocument(document) {
  return usersList
    .filter((object) => {
      return object["document"] === document;
    })
    .map((object) => {
      return object["user"];
    });
}
