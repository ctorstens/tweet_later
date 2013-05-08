$(document).ready(function(){
});



var job_done = function (job_id) {
  $.ajax({
    type: 'get',
    url: "/status/" + job_id
  }).done(function (job_done_bool_string) {
    // turn string describing bool into actual bool
    // var job_done_bool = job_done_bool_string == "true";
    // job_done_bool;
    job_done_bool_string == "true";
  });
};


// var areWeThereYet = function (theJobId) {
//   job_done(theJobId);
//   console.log('are we there yet?');
// };


function recursiveDoneCheck(num_times, job_id) {
  console.log('checking for readiness');
  if (num_times < 10  && !job_done(job_id)) {
    setTimeout(function() {recursiveDoneCheck(num_times+1)}, 1000);
  } else {
    $('#tweet_messenger_status').html('<p>Tweet Posted</p>');
  }
}

$(document).on('submit','.send_tweet',function(e){
  e.preventDefault();
  // var do_we_have_the_job_running?
  $.ajax({
    type: 'post',
    url: '/tweet/post',
    data: $(this).serialize()
  }).done(function (theJobId) {
    // display on erb "Tweet is in the queue"
    $('#tweet_messenger_status').html('<p>Tweet is in the queue</p>');

    recursiveDoneCheck(10, theJobId);

    // setTimeout(job_done(theJobId),3000);
    // job_done(theJobId);
    // areWeThereYet(theJobId);

    // var annoying_child = setInterval(function (theJobId) {
    //   job_done(theJobId);
    //   console.log('are we there yet?');
    //   if (job_done(theJobId)) {
    //     clearInterval(annoying_child);
    //   }
    // )};, 4000);

    // $('#tweet_messenger_status').html('<p>Tweet Posted</p>'); // display on erb "Tweet Posted"

    // if (job_done(theJobId)) {
    //   console.log('testing to see if the job is done');
    //   clearInterval(annoying_child);
    // };
  });
});



// function recursiveDoneCheck(num_times, job_id) {
//   console.log('checking for readiness');
//   if (num_times < 10  && !job_done(job_id)) {
//     setTimeout(function() {recursiveDoneCheck(num_times+1)}, 600);
//   } else {
//     $('#tweet_messenger_status').html('<p>Tweet Posted</p>');
//   }
// }









// JEFFREY'S HELP
// function recursiveSetTimeoutExample(num_times) {
//   console.log("in 5 seconds, I'll print this again unless I've done it 5 times");
//   if (num_times < 5) {
//     setTimeout(function() { recursiveSetTimeoutExample(num_times+1) }, 5000);
//   }
// }
// recursiveSetTimeoutExample(0);






