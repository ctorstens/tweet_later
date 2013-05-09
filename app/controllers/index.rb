get '/' do
  erb :index
end

get '/sign_in' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  redirect request_token.authorize_url
end

get '/sign_out' do
  session.clear
  redirect '/'
end

get '/auth' do
  # the `request_token` method is defined in `app/helpers/oauth.rb`
  @access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
  # our request token is only valid until we use it to get an access token, so let's delete it from our session
  @user = User.find_or_create_by_username(
              username: @access_token.params[:screen_name], 
              oauth_token: @access_token.token,
              oauth_secret: @access_token.secret)
  session.delete(:request_token)
  # User.create
  # at this point in the code is where you'll need to create your user account and store the access token
  session[:user_id] = @user.id
  redirect '/'
  
end

post '/tweet/post' do 
  @user = User.find(session[:user_id])
  # @client = Twitter::Client.new(
  #   :oauth_token => @user.oauth_token,
  #   :oauth_token_secret => @user.oauth_secret
  #   )

  # Create tweet object, which is attached to user && Send tweet object to tweet worker for database placement
  @the_job_id = @user.tweet(params[:tweet], 3)

end


get '/status/:job_id' do 
  
  # puts "HEYYYYYYY should return jid"
  job_is_complete(params[:job_id]).to_s
  # puts TweetWorker.job_is_complete(the_job_id)
  # return the status of a job to an AJAX call
end
