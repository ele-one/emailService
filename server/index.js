var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/


app.get('/publishNotification', publishNotification);
app.post('/subscribe', subscribe);
/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function publishNotification(req, res) {
  res.send('helloo from email!')
}

function subscribe(req, res) {
  if (!req.body.phone && !req.body.email) throw new Error("invalid input")
  res.send('done')

  console.log('^^^^^^^^^^^^^ .... ^^^^^^^^^^^^', req.body);
}


var port = process.env.PORT || 5004;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

