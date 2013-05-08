class User < ActiveRecord::Base
  has_many :tweets
  validates :username, :uniqueness => true

  def tweet(status)
    puts "PERFORM tweet status XXXXXXXXXXXXXXXXXX"
      tweet = tweets.create!(:status => status)
      TweetWorker.perform_async(tweet.id)
    end
end
