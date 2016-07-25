var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyAMA0',{
    baudRate: 115200,
    parser: SerialPort.parsers.readline('\n')
    // parser: SerialPort.parsers.byteLength(10)
});

port.on('open',function(err){
    
    if(err) return console.log('Error on write : ', err.message);    
    console.log('serial open ');
}); 

port.on('data',function (data){
    console.log('Data: '+data);
});

port.on('error', function(err) {
    console.log('Error: ', err.message);
});



console.log('start');
