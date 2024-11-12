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

export function getUserAndDocument(user, document) {
  return usersList.filter((object) => {
    return (object["user"] == user) & (object["document"] == document);
  });
}

export function removeUserFromDocument(user, document) {
  const index = usersList.findIndex((object) => {
    return (object["user"] === user) & object;
  });
  usersList.splice(index, 1);
  console.log(usersList);
}
