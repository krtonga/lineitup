class Category < ActiveRecord::Base
  belongs_to :user
  has_many :haps
  has_many :events, through: :haps
end
