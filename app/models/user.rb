class User < ActiveRecord::Base
	has_many :authorizations
  attr_accessible :name
  validates :name, :presence => true

  def self.create_from_hash!(hash)
  	create(:name => hash['info']['name'])
  end

  def tweet(message)
    authorization = self.authorizations.find_by_provider('twitter')

    tweeter = Twitter::Client.new(
      :oauth_token => authorization.token,
      :oauth_token_secret => authorization.secret
    )

    tweeter.update(message)
  end
end
