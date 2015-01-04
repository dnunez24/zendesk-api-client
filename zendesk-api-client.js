const https = require('https');

function ZendeskApiClient(opts) {
  this.hostname = opts.hostname;
  this.username = opts.username;
  this.apiToken = opts.apiToken;
  this.password = opts.password;
}

ZendeskApiClient.prototype.get = function(path, callback) {
  var options = buildRequestOptions(this, {
    method: 'GET',
    path: path
  });

  return sendRequest(options, callback);
};

ZendeskApiClient.prototype.put = function(path, callback) {
  var options = buildRequestOptions(this, {
    method: 'PUT',
    path: path,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return sendRequest(options, callback);
};

ZendeskApiClient.prototype.post = function(path, callback) {
  var options = buildRequestOptions(this, {
    method: 'POST',
    path: path,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return sendRequest(options, callback);
};

ZendeskApiClient.prototype.delete = function(path, callback) {
  var options = buildRequestOptions(this, {
    method: 'DELETE',
    path: path
  });

  return sendRequest(options, callback);
};

function buildAuthString(client) {
  var user, secret;

  if (client.apiToken) {
    user = client.username + '/token';
    secret = client.apiToken;
  } else {
    user = client.username;
    secret = client.password;
  }

  return user + ':' + secret;
}

function buildRequestOptions(client, args) {
  var headers = args.headers || {};
  headers['Accept'] = 'application/json';

  var options = {
    hostname: client.hostname,
    method: args.method,
    path: args.path,
    auth: buildAuthString(client),
    headers: headers
  };

  return options;
}

function sendRequest(options, callback) {
  var req = https.request(options);
  req.on('response', function(res) {
    callback(res, null);
  });
  req.on('error', function(err) {
    callback(null, err);
  });
  return req.end();
}

module.exports = ZendeskApiClient;
