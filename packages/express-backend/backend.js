// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor"
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ]
// };

// const findUserByName = (name) => {
//   return users["users_list"].filter(
//     (user) => user["name"] === name
//   );
// };

// const findUserByJob = (job) => {
//   return users["users_list"].filter(
//     (user) => user["job"] === job
//   );
// };

// const findUserByNameAndJob = (name, job) => {
//   return users["users_list"].filter(
//     user => (user["name"] === name && 
//     user["job"] === job)
//   );
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const generateId = () => {return Math.random().toString(36)}

// const addUser = (user) => {
//   users["users_list"].push(user);
//   return user;
// };
 app.use(cors());
 app.use(express.json());
 app.get("/", (req, res) => {
   res.send("Hello World!");
 });

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  userServices.getUsers(name, job)
  .then( (result) => {
    if (result) res.send(result);
    else res.status(404).send(`ERROR: Users with name ${name} and job ${job} not found.`);
  })
  .catch((error) => res.status(500).send(error.name));

  // if (name != undefined) {
  //   if (job != undefined) {
  //     let result = findUserByNameAndJob(name, job);
  //     result = {users_list: result};
  //     res.send(result);
  //   } else {
  //     let result = findUserByName(name);
  //     result = { users_list: result };
  //     res.send(result);
  //   }
  // } else if (job != undefined) {
  //   let result = findUserByJob(job);
  //     result = { users_list: result };
  //     res.send(result);
  // } else {
  //   res.send(users);
  // }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices.findUserById(id)
  .then( (result) => {
    if (result) res.send(result);
    else res.status(404).send(`Not Found: ${id}`);
  })
  .catch((error) => res.status(500).send(error.name));

  // const id = req.params["id"]; //or req.params.id
  // let result = findUserById(id);
  // if (result === undefined) {
  //   res.status(404).send("Resource not found.");
  // } else {
  //   res.send(result);
  // }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices.addUser(userToAdd)
  .then( (result) => {
    if (result) res.send(result);
  })
  .catch((error) => res.status(500).send(error.name));

  // const userToAdd = req.body;
  // console.log(userToAdd)
  // if (req.body.id === undefined) {
  //   userToAdd.id = generateId();
  // }
  // addUser(userToAdd);
  // res.status(201).send(userToAdd);
});

const deleteUser = (user) => {
  const index = users["users_list"].indexOf(user);
  if (index != -1) 
    return users["users_list"].splice(index, 1)[0];
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);

  if (user == undefined) {
    res.status(404).send("Resource not found.");
  }

  let result = deleteUser(user);
  
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send(result);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});