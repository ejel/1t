$(document).ready(function() {
    //this is our JSON (data)

    var tabs = { tabs: [
    {
        "title": "bootstrap",
        "url": "www.bootstrap.com",
        "favIconUrl": "favIconUrl",
        "screenShotUrl": "screenShotUrl"
    },
    {
        "title": "the verge",
        "url": "www.theverge.com",
        "favIconUrl": "vergeFav",
        "screenShotUrl": "vergess"
    }
    ]};

    //get a reference to our HTML template
    template = $('#template').html(),

    //tell Mustache.js to iterate through the JSON and insert the data into the HTML template
    output = Mustache.render(template, tabs);

    //append the HTML template to the DOM
    $('.tabs').append(output);
  })();