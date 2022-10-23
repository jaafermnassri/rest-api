const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/User");
const app = express();
const port = 7000;


app.use(express.json());

async function cnx() {
    try {
      await mongoose.connect("mongodb+srv://jaafer:aqwerty6@cluster0.v3z3exv.mongodb.net/rst?retryWrites=true&w=majority").then(() => console.log("connection successful"));
      
    } catch (error) {
      console.log(error.message);
    }
  }
  cnx();
app.get('/', async (req, res) => {
    try {
        const Users =await  User.find()
         
         res.send(Users)
    }
    catch (err) {console.log(err.message)}
})

app.post('/add', async (req, res) => {
    try {
        const newUser =  new User ({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            superpower: req.body.superpower
        })
        res.send(newUser)
        await newUser.save((err, result) => {
            if (err) {console.log(err.message);}
            if (result) {console.log('user added successfully');}
        })
    }catch (err) {console.log(err.message)}
})


app.put('/edit/:id', async (req,res) => {
    try {
        const userUpdated = await User.findByIdAndUpdate({_id : req.params.id},{...req.body})
        if (true == true) {
            const userAfterUpdated = await User.find({_id: req.params.id})
            return res.send({msg :"user is updated successfully",userAfterUpdated})
        }else {
            return res.status(400).send({msg : 'user is already updated'})
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        User.findByIdAndDelete({_id : req.params.id}, (err,result) => {
            if (err) {console.log(err.message);}
            if (result) {console.log('deleted successfully');}
        })
        res.send({msg:"user is deleted"})
    }catch (err) {console.log(err.message)}
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));