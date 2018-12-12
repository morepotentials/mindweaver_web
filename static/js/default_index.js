$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

//WEAVES
var process_weaves = function() {
  var i=0;
  var j=0;
  var k=0;
  app.for_me.map(function(e) {
    Vue.set(e, 'idx', i++);
    Vue.set(e, 'show_modal', false);
  });
  app.from_me.map(function(e) {
    Vue.set(e, 'idx', j++);
    console.log(j);
    console.log(e.id);
    Vue.set(e, 'show_modal', false);
  });
  app.for_others.map(function(e) {
    Vue.set(e, 'idx', k++);
    Vue.set(e, 'show_modal', false);
  });
};

var get_forme_weaves = function() {
    $.getJSON(get_forme_weaves_url, function(response) {
        app.for_me = response.results;
        //console.log(app.for_me);
        process_weaves();
    });
};

var get_fromme_weaves = function() {
  $.getJSON(get_fromme_weaves_url, function(response) {
      app.from_me = response.results;
      //console.log("fromme");
      //console.log(app.from_me);
      process_weaves();
  });
};

var get_forothers_weaves = function() {
  $.getJSON(get_forothers_weaves_url, function(response) {
      app.for_others = response.results;
      //console.log("forothers");
      //console.log(app.for_others);
      process_weaves();
  });
};

var for_me_modal = function(idx) {
  app.for_me[idx].show_modal = !app.for_me[idx].show_modal;
};

var from_me_modal = function(idx) {
  console.log(app.from_me);
  app.from_me[idx].show_modal = !app.from_me[idx].show_modal;
};

var for_others_modal = function(idx) {
  app.for_others[idx].show_modal = !app.for_others[idx].show_modal;
};

//USERS
var process_users = function() {
  var i=0;
  app.users.map(function(e) {
    Vue.set(e, 'idx', i++);
    Vue.set(e, 'checked', false);
  });
};

var get_users = function() {
  $.getJSON(get_users_url, function(response) {
    app.users = response.results;
    console.log(app.users);
    process_users();
});
} 

create_weave = function() {
  selected_user = [];
  for (var i = 0; i<app.users.length ;i++){
    if(app.users[i].checked){
      selected_user.push(app.users[i]);
    }
  }
  var new_weave = {
    title: app.title,
    purpose: app.purpose,
    members: selected_user,
    number_of_users: selected_user.length
  };
  $.post(get_create_weave_url, new_weave, function (response) {
      app.title = '';
      app.purpose = '';
      new_weave.id = response.id;
      app.from_me.unshift(new_weave);
      //app.for_others.push(new_weave);
      process_weaves();
  });

}

var find_weave = function(array, id){
  for(var i=0; i< array.length; i++){
    if(array[i].id == id){
      return i;
    }
  }
  return -1;
}


var delete_weave = function(idx, id){
  var deleted_weave = {
    id: id
  }
  console.log(deleted_weave.id)
  $.post(get_delete_weave_url, deleted_weave,function(response) {
    var index_in_for_others = find_weave(app.for_others, deleted_weave.id);
    if(index_in_for_others != -1){
      app.for_others.splice(index_in_for_others, 1);
    }
    app.from_me.splice(idx, 1);
    process_weaves();
  });
}

var focus_title = function() {
  setTimeout(function(){
    $('#weave_title').focus();
  }, 1);
};

var focus_purpose = function() {
  setTimeout(function(){
    $('#weave_purpose').focus();
  }, 1);
};

var app = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
    data: {
      for_me: [],
      from_me: [],
      for_others: [],
      users: [],
      title: '',
      purpose: ''
    },
    methods: {
      for_me_modal: for_me_modal,
      from_me_modal: from_me_modal,
      for_others_modal: for_others_modal,
      create_weave: create_weave,
      delete_weave: delete_weave,
      focus_title: focus_title,
      focus_purpose: focus_purpose,
    }
});

get_forme_weaves();
get_forothers_weaves();
get_fromme_weaves();

get_users();