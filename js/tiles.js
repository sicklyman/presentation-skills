$(".tile").click(function() {
  var contentLink = $(this).attr("id");
  var activityType = contentLink.split("-");
  $("#modal-content").addClass(activityType[1]).fadeIn(500).html("<link rel='import' href='tiles/"+contentLink+".html'>");
  $("#overlay").fadeIn(300);
});