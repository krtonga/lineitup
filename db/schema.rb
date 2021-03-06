# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140615151154) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "events", force: true do |t|
    t.string   "category"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "end_date"
    t.datetime "start_date"
    t.string   "recurstring"
    t.string   "event_name"
    t.string   "event_detail_url"
    t.string   "city"
    t.string   "state"
    t.string   "times_pick"
    t.string   "recurring_start_date"
    t.string   "recur_days"
    t.string   "venue_name"
    t.string   "venue_detail_url"
    t.string   "geocode_latitude"
    t.string   "geocode_longitude"
    t.string   "street_address"
    t.string   "postal_code"
    t.string   "telephone"
    t.string   "venue_website"
    t.string   "price"
    t.string   "date_time_description"
    t.string   "recurring_end_date"
    t.string   "event_date_list"
    t.integer  "event_id"
    t.string   "free"
    t.text     "web_description"
  end

  create_table "haps", force: true do |t|
    t.integer  "category_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",            null: false
    t.string   "crypted_password", null: false
    t.string   "salt",             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
