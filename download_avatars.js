var request = require('request');
var secrets = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.token

    }
  }
  request(options, function(err, res, body) {
    var bodyObject = JSON.parse(body);
    cb(err, bodyObject);
  });
};

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var index in result) {
    if (err){
      console.log(err);
      return err;
    }
    console.log('\n');
    console.log("avatar.url: ", result[index].avatar_url);
}
});