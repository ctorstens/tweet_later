class TweetWorker
  include Sidekiq::Worker

  def perform(tweet_id)
    puts "PERFORM RUNNING XXXXXXXXXXXXXXXXXX"
    tweet = Tweet.find(tweet_id)
    user  = tweet.user
    puts "@client about to... XXXXXXXXXXXXXXXXXX"

    @client = Twitter::Client.new(
      # :consumer_key => 'wDQtKD6I3xKM1HHlyUgBQ',
      # :consumer_secret => 'tmCeoinEY2ItZdCr36nJXTjDsUXdtUHrAkufLC6dM',
      :oauth_token => user.oauth_token,
      :oauth_token_secret => user.oauth_secret
    )
p "HEY!!!"
p @client
    @client.update(tweet.status)

      # set up Twitter OAuth client here
      # actually make API call
      # Note: this does not have access to controller/view helpers
      # You'll have to re-initialize everything inside here
    end
  end
