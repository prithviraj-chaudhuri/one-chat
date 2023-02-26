$(function() {
  appconfig = JSON.parse($("#init-data").val());
  var tablinks = "";
  var tabcontent = "";
  $.each(appconfig.platforms, function(key, value) {
    if (key == 0){
      tablinks += '<button class="tablinks active" data-target="'+value.id+'">'+value.name+'</button>';
      tabcontent += '<div id="'+value.id+'" class="tabcontent col-sm-10 active-tab">' +
                      '<webview src="'+value.url+'" useragent="'+value.useragent+'"></webview>' +
                    '</div>';
    } else {
      tablinks += '<button class="tablinks" data-target="'+value.id+'">'+value.name+'</button>';
      tabcontent += '<div id="'+value.id+'" class="tabcontent col-sm-10">' +
                      '<webview src="'+value.url+'" useragent="'+value.useragent+'"></webview>' +
                    '</div>';
    }
  });
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

