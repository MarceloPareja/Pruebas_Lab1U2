import { User } from "../Models/User";

export class Controller{
    constructor()
    {
        this.database=[];
    }

    getAllUsers() {
        return JSON.stringify(this.database);
    }

    addNewUser(name, email){
        if(this.validateName(name) && this.validateMail(email))
        {
            let newId=this.database.length+1;
            this.database.push(new User(newId, name, email));
            return {message: "Usuario Creado", status: "201"};
        }
        else
        {
            throw new Error("Error. Nombre o correo invalidos, no se pudo guardar.");
        }
    }

    validateName(name){
        const nameRegexp=/^([A-Za-zñÑ]){3,20}$/;
        return nameRegexp.test(name);
    }

    validateMail(email)
    {
        const emailRegexp=/^[a-zA-Z0–9._%+-]{3,}@[a-zA-Z0–9.-]{2,}\.[a-zA-Z]{2,}$/;
        return emailRegexp.test(email);
    }
}