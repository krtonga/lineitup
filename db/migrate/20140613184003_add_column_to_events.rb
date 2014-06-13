class AddColumnToEvents < ActiveRecord::Migration
  def change
    add_column :events, :end_date, :timestamp
    add_column :events, :start_date, :timestamp
    add_column :events, :recurstring, :string
    add_column :events, :event_name, :string
    add_column :events, :event_detail_url, :string
    add_column :events, :web_description, :string
    add_column :events, :city, :string
    add_column :events, :state, :string

    add_column :events, :times_pick, :string
    add_column :events, :recurring_start_date, :string
    add_column :events, :recur_days, :string
    add_column :events, :venue_name, :string
    add_column :events, :venue_detail_url, :string
    add_column :events, :geocode_latitude, :string
    add_column :events, :geocode_longitude, :string
    add_column :events, :street_address, :string
    add_column :events, :postal_code, :string
    add_column :events, :telephone, :string
    add_column :events, :venue_website, :string
    add_column :events, :price, :string
    add_column :events, :date_time_description, :string
    add_column :events, :recurring_end_date, :string
     add_column :events, :event_date_list, :string



  end
end
