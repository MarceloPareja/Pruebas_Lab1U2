const User = require("../Models/User").User;
class Controller{
    constructor()
    {
        this.database=[];
    }

    getAllUsers() {
        return this.database;
    }

    addNewUser(name, email) {
    if (this.validateName(name) && this.validateMail(email)) {
        let newId = this.database.length + 1;
        this.database.push(new User(newId, name.trim(), email));
        return { message: "Usuario Creado" };  
    } else {
        throw new Error("Nombre o correo invalidos");
    }
}

    validateName(name) {
    if (!name || typeof name !== 'string') return false;
    const cleaned = name.trim();
    if (cleaned.length < 3 || cleaned.length > 40) return false;

    const nameRegexp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return nameRegexp.test(cleaned);
}

validateMail(email) {
    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegexp.test(email);
}
}

module.exports={Controller};