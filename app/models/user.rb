class User < ActiveRecord::Base
  has_many :tweets
  validates :username, :uniqueness => true

  def tweet(status, delay=0)
    tweet = tweets.create!(:status => status)
    if delay == 0
      TweetWorker.perform_async(tweet.id)
    else
      TweetWorker.perform_at(delay.second.from_now, tweet.id)
    end
  end
end
