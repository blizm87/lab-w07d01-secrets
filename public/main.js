console.log('sshhh');

$('#create').on('click', function(evt){
  var newSecret = {
    message: $('#message').val(),
  }
  $.post('/secrets', newSecret, function(res){
    console.log(res);
  });
})
$('.like-btn').on('click', function(evt) {
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.post('/secrets/' + id + '/likes', function(res) {
    console.log(res);
    var secret = res.value;
    var html = render(secret);
    $btn.closest('.secret').html(html);
  });
});

$('.remove-btn').on('click', function(evt){
  var $btn = $(evt.target);
  var id = $btn.data().id;
  $.ajax({
    url: '/secrets/' + id,
    method: "DELETE"
  }).then(function(res){
    console.log(res);
  });
});

function render(secret) {
  var temp = $('template').html();
  var compile = Handlebars.compile(temp);
  return compile({secret: secret});
}
