class Hap < ActiveRecord::Base
  belongs_to :category
  belongs_to :event
  validates_uniqueness_of :category_id, scope: :event_id

end
