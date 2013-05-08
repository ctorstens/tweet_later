// var job_done = function (job_id) {
//   $.ajax({
//     type: 'get',
//     url: "/status/" + job_id
//   }).done(function (job_done_bool_string) {
//     console.log(job_done_bool_string);
//   });
// };

var job_done = function (job_id) {
  $.ajax({
    type: 'get',
    url: "/status/" + job_id
  }).done(function (job_done_bool_string) {
    // turn string describing bool into actual bool
    var job_done_bool = job_done_bool_string == "true";
    job_done_bool;
  });
};


$(document).on('submit','.send_tweet',function(e){
  e.preventDefault();
    // var do_we_have_the_job_running?
    $.ajax({
      type: 'post',
      url: '/tweet/post',
      data: $(this).serialize()
    }).done( function(theJobId){

        console.log(theJobId);
      
        console.log(job_done(theJobId));

      console.log("you're tweet is in the queue");
      // console.log(job_done(theJobId));

    });

  });



$(document).ready(function(){
});
