const server = require('ws').Server,
      serv = new server({port: 5001});

serv.on('connection', function(ws) {
      ws.on('message', function(message) {
            var checkStatus = JSON.parse(message);
            
            if(checkStatus.childStatus === "on" ) {
                  checkStatus.childStatus = "off"
            } else {
                 checkStatus.childStatus = "on" 
            }
            ws.send(JSON.stringify(checkStatus));
      })

      ws.on('close', function(){
            console.log('leave');
      })

      console.log('connection');
})