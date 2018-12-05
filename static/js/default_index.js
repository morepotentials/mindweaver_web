var get_your_weaves = function() {
    $.getJSON(get_your_weaves_url, function(response) {
        app.for_me = response.results;
        console.log(app.for_me);
    });
};

var app = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
    data: {
      for_me: []
    }
  });

  get_your_weaves();