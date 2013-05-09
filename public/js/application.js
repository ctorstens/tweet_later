
$(document).ready(function(){

  var job_done = function (job_id) {
    var i = setInterval(function () {
      $.ajax({
        type: 'get',
        url: '/status/' + job_id
      }).done(function (boolean_response) {
        if (boolean_response == 'true')
        {
          clearInterval(i);
          $('#tweet_messenger_status').html('<p>Tweet Posted</p>');
        }
      });
    }, 1000);
  };

  $(document).on('submit','.send_tweet',function(e){
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/tweet/post',
      data: $(this).serialize()
    }).done(function (theJobId) {
      $('#tweet_messenger_status').html('<p>Tweet is in the queue</p>');
      job_done(theJobId);
    });
  });
});
