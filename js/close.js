$(".close").click(function() {
  $("#overlay").fadeOut(300);
  $("#modal-content").fadeOut(200);
  
  setTimeout(function(){
  	$("#modal-content").attr("class","");
  	$(".content").html("");
	}, 300);
});