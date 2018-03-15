
let editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: 'javascript',
  lineNumbers: true,
  theme: "blackboard"
});
let socket = io.connect('localhost:3000');
let play=document.getElementById('play');
let link=document.getElementById('link');









function createYouTubeEmbedLink (link) {
  
  embed = link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
  return embed;    
}

$(function() {
  $(".video").click(function () {
    var theModal = $(this).data("target"),

    videoSRC = createYouTubeEmbedLink($('#link').val()),
    videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
    $(theModal + ' iframe').attr('src', videoSRCauto);
    $(theModal + ' button.close').click(function () {
    $(theModal + ' iframe').attr('src', videoSRC);
    });
  });
});
play.addEventListener('click',function(){
socket.emit('url',{
  url: link.value
})
});
socket.on('url',function(data){
  $('#link').val(data.url);
  $('.video').click();
  });

  

socket.on('refresh', function (data) {
editor.setValue(data.body);
});
socket.on('change', function (data) {
console.log(data);
editor.replaceRange(data.text, data.from, data.to);
});
editor.on('change', function (i, op) {
console.log(op);
socket.emit('change', op);
socket.emit('refresh', editor.getValue());
});
    







function createYouTubeEmbedLink (link) {
    
    embed = link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    return embed;    
}
    
  $(function() {
    $("#play1").touchdown(function () {
      var theModal = $(this).data("target"),

      videoSRC = createYouTubeEmbedLink($('#link').val()),
      videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').click(function () {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
    //   $('#videoModal').on('hide.bs.modal', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     return false;
    });
    });
