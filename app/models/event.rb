class Event < ActiveRecord::Base
  has_many :haps
  has_many :categories, through: :haps
end
