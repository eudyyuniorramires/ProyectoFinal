
//Aqui se ocnfigura la base de datos tener en cuenta modificar env. con el nombre de la DB que creaste 

const mongoose  =  require('mongoose');


const conectarDB  = async() => {

    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("Se conecto a la base de datos");
    }
    catch(error){
        console.log('Error al conectar el servidor',error.message);
        process.exit(1);
    }

    

};

module.exports = conectarDB;