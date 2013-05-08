class TweetWorker
  include Sidekiq::Worker

  def perform(tweet_id)
    tweet = Tweet.find(tweet_id)
    user  = tweet.user
    @client = Twitter::Client.new(
      :oauth_token => user.oauth_token,
      :oauth_token_secret => user.oauth_secret
      )
    @client.update(tweet.status)
  end

  def job_is_complete(jid)
    waiting = Sidekiq::Queue.new
    working = Sidekiq::Workers.new
    pending = Sidekiq::ScheduledSet.new
    return false if pending.find { |job| job.jid == jid }
    return false if waiting.find { |job| job.jid == jid }
    return false if working.find { |worker, info| info["payload"]["jid"] == jid }
    true
  end
end
