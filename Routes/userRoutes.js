import { Controller } from "../Controllers/userController";
const express=require("express");
const router=express.Router();

/*Esto garantiza que solo exista una instancia del controlador y del arreglo de datos*/
const controller=new Controller();


router.get("/", (req, res)=>{
    
    try
    {
        const users = controller.getAllUsers();
        (users.length>0)?
        res.status(200).json(users) :
        res.status(404).json({message: "No hay usuarios registrados"});
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

router.post("/new", (req, res)=>{
    
    try
    {
        const name=req.body.name;
        const email=req.body.email;
        const response=controller.addNewUser(name, email);
        res.status(201).json(response.message);
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
    }
});

module.exports=router;