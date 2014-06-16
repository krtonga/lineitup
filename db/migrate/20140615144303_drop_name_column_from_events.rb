class DropNameColumnFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :name
  end
end
