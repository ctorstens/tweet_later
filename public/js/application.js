$(document).on('submit','.send_tweet',function(e){
    e.preventDefault();

    // var do_we_have_the_job_running?

    $.ajax({
      type: 'post',
      url: '/tweet/post',
      data: $(this).serialize()
    }).done( function(data){

      @the_job_id = data

      console.log("you're tweet is in the queue")
    });

  });



$(document).ready(function(){
  });
