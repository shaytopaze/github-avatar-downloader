var request = require('request');
var token = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
      // 'Authorization': '71396a230d610cf8cee5ccf65a8cebb70db73bee'

    }
  }
  request(options, function(err, res, body) {
    cb(err, body);
  });
};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});