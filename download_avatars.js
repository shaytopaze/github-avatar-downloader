var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

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

module.exports = function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloading image...');
         console.log('Response: ' + response.statusCode + ' Response Message: ' + response.statusMessage + ' Content Type: ' + response.headers['content-type']);
       })
       .on('end', function (end) {
        console.log('Download complete');
        })
       .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")