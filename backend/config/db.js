const mongoose  =  require('mongoose');


const conectarDB  = async() => {

    try{
        await mongoose.connect(process.env.DB_URI)
    }
    catch(error){
        console.log('Error al conectar el servidor',error.message);
        process.exit(1);
    }


};

module.exports = conectarDB;