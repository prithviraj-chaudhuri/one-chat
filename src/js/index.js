$(function() {
  appconfig = JSON.parse(localStorage.getItem("appconfig"));
  var tablinks = "";
  var tabcontent = "";
  $.each(appconfig.platforms, function(key, value) {
    var image = "";
    if (value.icon.trim().length == 0) {
      image = value.name;
    } else {
      image = '<img class="icon" src="'+value.icon+'"/>';
    }

    if (key == 0){
      tablinks += '<button class="tablinks active" data-target="'+value.id+'">'+image+'</button>';
      tabcontent += '<div id="'+value.id+'" class="tabcontent col-sm-11 active-tab">' +
                      '<webview src="'+value.url+'" useragent="'+value.useragent+'"></webview>' +
                    '</div>';
    } else {
      tablinks += '<button class="tablinks" data-target="'+value.id+'">'+image+'</button>';
      tabcontent += '<div id="'+value.id+'" class="tabcontent col-sm-11">' +
                      '<webview src="'+value.url+'" useragent="'+value.useragent+'"></webview>' +
                    '</div>';
    }
  });
  tablinks += '<button class="tablinks" data-target="add-new">Add New</button>';
  tabcontent += '<div id="add-new" class="tabcontent add-new-section col-sm-11">'+
                  '<form id="add-new-form">' +
                    '<div class="form-group">' +
                      '<label for="url-input">ID</label>' +
                      '<input type="text" class="form-control" id="id" placeholder="Enter Unique ID">' +
                      '<br/>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label for="url-input">URL</label>' +
                      '<input type="text" class="form-control" id="url" placeholder="Enter URL">' +
                      '<br/>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label for="name-input">Name</label>' +
                      '<input type="text" class="form-control" id="name" placeholder="Enter Name">' +
                      '<br/>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label for="image-input">Image Path</label>' +
                      '<input type="text" class="form-control" id="image" placeholder="Enter Icon Path">' +
                      '<br/>' +
                    '</div>' +
                    '<div class="form-group">' +
                      '<label for="user-agent-input">User Agent</label>' +
                      '<input type="text" class="form-control" id="user-agent" placeholder="Enter User Agent">' +
                      '<br/>' +
                    '</div>' +
                    '<button type="submit" class="btn btn-primary">Submit</button>' +
                  '</form>' +
                '</div>';
  $(".tab").html(tablinks);
  $(".parent-tab").html($(".parent-tab").html() + tabcontent);

  $( ".tablinks" ).on( "click", function() {
    var target = ($(this).attr("data-target"));
    $(".tablinks").each( function() {
      $(this).removeClass("active");
    });
    $(this).addClass("active");

    $(".tabcontent").each( function() {
      $(this).removeClass("active-tab")
    })
    $("#"+target).addClass("active-tab");
  });

  $("#add-new-form").on("submit", function( event ) {
    event.preventDefault();
    webapp = {
      "id":         $("#id").val(),
      "name":       $("#name").val(),
      "url":        $("#url").val(),
      "useragent":  $("#user-agent").val(),
      "icon":       $("#image").val()
    }
    appconfig.platforms.push(webapp);
    localStorage.clear();
    localStorage.setItem("appconfig", JSON.stringify(appconfig));
  });
});

