const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const { update } = require("./models/Users");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:1234@cluster0.im4zhlg.mongodb.net/mern-stack?retryWrites=true&w=majority"
);

//back end tarafında get metodu kullanımı
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(newUser);
});

app.put("/updateUser", async (req, res) => {
  const newName = req.body.newName;
  const newAge = req.body.newAge;
  const newUsername = req.body.newUsername;
  const newImg = req.body.newImg;
  const id = req.body.id;

  try {
    await UserModel.findById(id, (err, updatedUser) => {
      updatedUser.name = newName;
      updatedUser.age = newAge;
      updatedUser.username = newUsername;
      updatedUser.img = newImg;
      updatedUser.save();
    });
  } catch (error) {
    console.log(error);
  }

  res.json("Updated succesfully");
});

//Delete Metodu
app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id).exec();
  res.json("delete successfully");
});

app.listen(5000, () => {
  console.log("Server 5000 portunda başarıyla çalışmaktadır. (: (: (:");
});
