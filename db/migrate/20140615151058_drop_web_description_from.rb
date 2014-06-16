class DropWebDescriptionFrom < ActiveRecord::Migration
  def change
    remove_column :events, :web_description
  end
end
