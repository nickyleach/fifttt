class Authorization < ActiveRecord::Base
  belongs_to :user
  attr_accessible :provider, :uid, :user_id, :token, :secret
  validates :provider, :uid, :user_id, :token, :secret, :presence => true

  def self.find_from_hash(hash)
    find_by_provider_and_uid(hash['provider'], hash['uid'])
  end

  def self.create_from_hash(hash, user = nil)
    user ||= User.create_from_hash!(hash)
    create(:user_id => user.id, :uid => hash['uid'], :provider => hash['provider'], :token => hash['credentials']['token'], :secret => hash['credentials']['secret'])
  end
end
