$(document).ready(function() {
    chrome.storage.local.get("tabs", function(tabs) {
        //get a reference to our HTML template
        template = $('#template').html(),
        //tell Mustache.js to iterate through the JSON and insert the data into the HTML template
        output = Mustache.render(template, tabs);
        //append the HTML template to the DOM
        $('.tabs').append(output);
    });
});
