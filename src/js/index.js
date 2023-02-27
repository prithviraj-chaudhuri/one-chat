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
  tablinks += '<button class="tablinks" data-targe="add-new">Add New</button>';
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
});

