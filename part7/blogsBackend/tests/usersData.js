const initialUser = {
  username: "testSuperUser",
  name: "Test User",
  password: "examplePassword",
};

const initialUser2 = {
  username: "experimentSuperUser",
  name: "Experiment User",
  password: "suggestionPassword",
};

const iUserLogin = {
  username: "testSuperUser",
  password: "examplePassword",
};

const validUser = {
  username: "superOriginalUsername",
  name: "Super Hecking Valid",
  password: "trailblazer",
};

const sameUsernameUser = {
  username: "testSuperUser",
  name: "Definitely not the other guy",
  password: "a different password",
};

const smallUsernameUser = {
  username: "a",
  name: "Small Username",
  password: "cutesy",
};
const smallPasswordUser = {
  username: "Small Password",
  name: "Teeny P",
  password: "e",
};

module.exports = {
  initialUser,
  initialUser2,
  iUserLogin,
  validUser,
  sameUsernameUser,
  smallUsernameUser,
  smallPasswordUser,
};
