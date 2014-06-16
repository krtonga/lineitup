class UpdateEventsColumns < ActiveRecord::Migration
  def change
    add_column :events, :event_id, :integer
    add_column :events, :free, :string
  end
end

