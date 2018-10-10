var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var snsUtil = require('./sns-sms-email.js');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var BROWN_TOPIC_ARN = '';

snsUtil.createOrGetTopic('brown_sns')
.then( (topicARN) => {
  BROWN_TOPIC_ARN = topicARN;
  return topicARN
})
.then( (topicARN) => {
  snsUtil.subscribeSMS(topicARN, '+1xxxxxxxxxx')
  snsUtil.subscribeEmail(topicARN, 'xxxxxx@xxxxx.com');
})



/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/


app.get('/snsPublish', snsPublish);
app.post('/snsSubscribe', snsSubscribe);

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function snsPublish(req, res) {
  console.log('************ in snsPublish **************')
   snsUtil.publish(BROWN_TOPIC_ARN, 'New IOC has been created', 'New IOC has been created just now. Please investigate');
   res.send('done');
}

function snsSubscribe(req, res) {
  console.log('************ in snsSubscribe **************')
  var data = JSON.parse(req.body);
  if (data.phone) snsUtil.subscribeSMS(BROWN_TOPIC_ARN, data.phone);
  if (data.email) snsUtil.subscribeEmail(BROWN_TOPIC_ARN, data.email);
  res.send('done');
}


var port = process.env.PORT || 5004;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

