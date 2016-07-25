// mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error: '));
db.once('open',function(){
    // we are connected

});

var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function(){
    var greeting = this.name
	? "Meow name is " + this.name : "I don't have a name";
    console.log(greeting);
};

var Kitten = mongoose.model('Kitten',kittySchema);

var silence = new Kitten({ name : 'Silence'});
console.log(silence.name);

var fluffy = new Kitten({name : 'fluffy'});
fluffy.speak();

fluffy.save(function(err, fluffy){
    if (err) return console.error(err);
    fluffy.speak();
});

kitten.find(function(err,kittens){
    if( err ) return console.error(err);
    console.log(kitten);
});

Kitten.find({name: /^Fluff/},callback);


var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyAMA0',{
    baudRate: 115200,
    parser: SerialPort.parsers.readline('\n')
});

port.on('open',function(){
    port.write('main screen turn on', function(err){
	if(err){
            return console.log('Error on write : ', err.message);
	}
	console.log('message written');
    });
}); 

port.on('data',function (data){
    console.log('Data: '+data);
});

var GPIO = require('onoff').Gpio, led = new GPIO(18,'out'), button = new GPIO(17,'in','both');
function light(err, state){
	if(state == 1){
		led.writeSync(1);
		console.log('on');
	}else{
		led.writeSync(0);
		console.log('off');
	}
}

console.log('start');
button.watch(light);
