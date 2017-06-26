const server = require('ws').Server,
      serv = new server({port: 5001});


serv.on('connection', function(ws) {
      ws.on('message', function(message) {
            console.log(message);
            ws.send(message);
            if(message == "off"){
                  console.log('change img');
                  ws.send(message)
            }
      })

      ws.on('close', function(){
            console.log('nooooooooo');
      })

      console.log('one more');
})