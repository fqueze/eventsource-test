var express = require("express"),
    https   = require("https"),
    sys     = require("sys"),
    app     = express();

app.use(express.bodyParser());
app.use(express.static(__dirname + "/static"));

app.get("/events", function(req, res) {
  sys.debug("/events connection opened");

  // Setup event channel.
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  // Ping every 1 second.
  var pinger = setInterval(function() {
    res.write("event: ping\ndata: ping\n\n");
  }, 1000);

  req.on("close", function() {
    clearInterval(pinger);
  });
});

var port = process.env.VMC_APP_PORT || process.env.PORT || 5000;
app.listen(port, function() {
  sys.debug("Port is " + port);
});
