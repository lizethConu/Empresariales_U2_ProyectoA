//mongoose
var mongoose = require('mongoose');
//Convertir csv to jason
const csvFilePath='Datos.csv';
const csv=require('csvtojson');
//Email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
//variables
var correos=[];
var nombres=[];
var nc=[];
var estudiante;


csv({trim:true,checkType:true}).fromFile(csvFilePath).then((jsonObj)=>{//checkType conviert cad a num
    saveData(jsonObj);
    getEmail(jsonObj)
    getName(jsonObj)
    getNc(jsonObj)
    sendEmail();    
})

//conexion a mongo
mongoose.connect('mongodb://localhost/',function(error){
    if(error){
        throw error;
    }else{
        console.log('conectado a mongo');
    }
});

//Esquema
var estudianteSchema=mongoose.Schema({
    nc:{type:Number},
    nombre:{type:String},
    carrera:{type:String},
    semestre:{type:Number},
    email:{type:String}
});
var estudianteModelo=mongoose.model('Estudiante',estudianteSchema);

function saveData(jsonObj){

}

function getEmail(jsonObj) {
    for(var i=0;i<jsonObj.length;i++){
        correos.push(jsonObj[i]['email']);
    }
}

function getName(jsonObj){
    for(var i=0;i<jsonObj.length;i++){
        nombres.push(jsonObj[i]['nombre']);
    }
}

function getNc(jsonObj){
    for(var i=0;i<jsonObj.length;i++){
        nc.push(jsonObj[i]['nc']);
    }
}

function sendEmail(){
    for(var i=0;i<Object.length;i++){
    sgMail.setApiKey('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');
    const msg = {
    to: correos[i],
    from: 'kalicovarrubiasnu@ittepic.edu.mx',
    subject: 'Prueba',
    text: 'Hola bievenido'+nombres[i],
    html: '<strong>Su pase a la jornada academica</strong>'+
    "<a rel='nofollow' href='http://www.qrcode-generator.de' border='0' style='cursor:default'><img src='https://chart.googleapis.com/chart?cht=qr&chl="+nc[i]+"&chs=180x180&choe=UTF-8&chld=L|2' alt=''></a>"
    };
    sgMail.send(msg);
    }
}





    






 

 