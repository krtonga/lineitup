class CreateHaps < ActiveRecord::Migration
  def change
    create_table :haps do |t|
      t.references :category
      t.references :event
      t.timestamps
    end
  end
end
