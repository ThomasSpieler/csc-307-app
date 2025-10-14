// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

 app.use(cors());
 app.use(express.json());
 app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
 });

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  userServices.getUsers(name, job)
  .then( (result) => {
    if (result) res.status(200).send(result);
    else res.status(404).send(`ERROR: Users with name ${name} and job ${job} not found.`);
  })
  .catch((error) => res.status(500).send(error.name));
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices.findUserById(id)
  .then( (result) => {
    if (result) res.status(200).send(result);
    else res.status(404).send(`Not Found: ${id}`);
  })
  .catch((error) => res.status(500).send(error.name));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices.addUser(userToAdd)
  .then( (result) => {
    if (result) res.status(201).send(result);
  })
  .catch((error) => res.status(500).send(error.name));
});

const deleteUser = (user) => {
  const index = users["users_list"].indexOf(user);
  if (index != -1) 
    return users["users_list"].splice(index, 1)[0];
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);

  userServices.removeUser(id)
  .then( (result) => {
    if (result) res.status(204).send(result);
  })
  .catch((error) => res.status(500).send(error.name));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});