var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var snsUtil = require('./sns-sms-email.js');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var BROWN_TOPIC = 'brown_sns';

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/


app.get('/snsPublish', snsPublish);
app.post('/snsSubscribe', snsSubscribe);

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function snsPublish(req, res) {
  snsUtil.createOrGetTopic(BROWN_TOPIC)
    .then( (topicARN) => {
      snsUtil.publish(topicARN, 'Brown IOC has been created or updated', 'Brown IOC has been created or modified. Please investigate');
      res.send('done');
  })
}

function snsSubscribe(req, res) {
  var data = req.body;
  if (data.phone) {
    snsUtil.createOrGetTopic(BROWN_TOPIC)
      .then( (topicARN) => {
       snsUtil.subscribeSMS(topicARN, data.phone, (err, result) => {
         if (err) res.send(err);
         if (result) res.send(result);
       });
    })
      .catch( (err) => {
      res.send(err)
     })
  }

  if (data.email) {
    snsUtil.createOrGetTopic(BROWN_TOPIC)
      .then( (topicARN) => {
       snsUtil.subscribeEmail(topicARN, data.email, (err, result) => {
        if (err) res.send(err);
        if (result) res.send(result);
       })
    })
     .catch( (err) => {
      res.send(err)
     })
  };

}




var port = process.env.PORT || 5004;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

