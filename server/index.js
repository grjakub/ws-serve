const server = require('ws').Server,
      serv = new server({port: 5001});


serv.on('connection', function(ws) {
      ws.on('message', function(message) {
            let checkStatus = JSON.parse(message);
            console.log(checkStatus + '<--- 1');
      
            if( checkStatus.childStatus === "on" ) {
                  checkStatus.childStatus = "off"
            } else {
                 checkStatus.childStatus = "on" 
            }
            console.log(checkStatus + '<--- 2');
            ws.send(JSON.stringify(checkStatus));
      })

      ws.on('close', function(){
            console.log('nooooooooo');
      })

      console.log('one more');
})