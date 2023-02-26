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
    var i, tabcontent, tablinks;
  
    tabcontent = $(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = $(".tablinks");;
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    $("#"+target).css("display", "block");
    $(this).addClass("active");
  });
});

