class AddWebDescriptionToEventsAsText < ActiveRecord::Migration
  def change
    add_column :events, :web_description, :text
  end
end
