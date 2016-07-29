var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'mongoose connection error:'));
db.once('open',function(){
	console.log('Ok db connected');
});

var wsnSchema = mongoose.Schema({ wsnData: String });

var wsnDB = mongoose.model('wsnDB',wsnSchema);

var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyAMA0',{
    baudRate: 115200,
    parser: SerialPort.parsers.readline('\n')
});

port.on('open',function(err){    
    if(err) return console.log('Error on write : ', err.message);    
    console.log('serial open ');
}); 

port.on('data',function (data){

    console.log('RXD: '+data);

	var wsnIn = new wsnDB({wsnData:data});
	wsnIn.save( function( err, wsnIn ){
		if(err) return console.error(err);	
	    console.log('SAVED: '+data);
	});
});

port.on('error', function(err) {
    console.log('Error: ', err.message);
    console.log('Error Occured');
});

console.log('start');

