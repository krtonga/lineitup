class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :categories
  has_many :events, through: :categories

  validates_presence_of :password, :on => :create
  validates_presence_of :email, :on => :create
  validates_uniqueness_of :email
end
