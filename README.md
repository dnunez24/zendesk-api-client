# Zendesk API Client

This library is meant to be a simple and flexible way to interact with the
Zendesk API. The problem I've encountered with existing Zendesk API libraries
is that they struggle to keep up with the rapid additions to the API because
they attempt to wrap all responses in convenient request methods and return
objects. My hope is that a simple library like this allows any future changes
in the API to still be consumable since it really acts more like a basic REST
client with some convenience for authenticating with Zendesk.

The implementation is pretty simplistic right now because the impetus for this
module's creation was to solve a specific problem, namely accessing the call
queue stats for the Voice portion of the API, and I'm also just learning Node.js.
You may find this useful, or it may be a complete piece of garbage. If the latter,
please feel free to suggest improvements by way of pull request and I'd be happy
to consider and incorporate them.

Now, to the example:

```javascript
// Create the client
const ZendeskApiClient = require('zendesk-api-client');
var client = new ZendeskApiClient({
  hostname: 'yourdomain.zendesk.com',
  username: 'yourusername',
  apiToken: 'yourapitoken'
});

// Make a request
client.get('/api/v2/tickets.json?status=new', function(res, err) {
  var data = '';

  // handle errors from the request
  if (err) {
    return console.error(err);
  }

  // handle the stream of JSON data
  res.on('data', function(chunk) {
    data += chunk;
  });

  // do something with the full JSON response
  res.on('end', function() {
    var dataObj = JSON.parse(data);
    var tickets = dataObj['tickets'];
    tickets.forEach(function(ticket) {
      console.log(ticket.id, ticket.subject);
    });
  });

  // handle errors in the response
  res.on('error', function(err) {
    return console.error(err);
  });
});
```
