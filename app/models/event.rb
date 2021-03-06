class Event < ActiveRecord::Base
  has_many :haps
  has_many :categories, through: :haps

  def self.pullAPI(category_filter)
    results = HTTParty.get('http://api.nytimes.com/svc/events/v2/listings.json?'+category_filter+'&api-key='+KEY1+'&limit=5000')
    get_uniq_results = {}
    results["results"].each do |event|
      get_uniq_results[event["event_id"]] = event
    end
    return get_uniq_results.values
  end

  def self.make_category_filter(params)
    categories = [
     "forChildren",
     "Art",
     "Theater",
     "Pop",
     "Comedy",
     "Dance",
     "Jazz",
     "Classical",
     "spareTimes"
   ]
   search_string = ""
   categories.each do |category|
    if params.keys.include?(category)
      search_string += category + "+"
    end
  end
  if search_string == ""
    return "&filters=category:(-Movies)"
  else
    return "&filters=category:(" + search_string.chop + ")"
  end
end

def self.make_search_query(search_word)
  if search_word == nil
    search_word = ""
  end
  search_string = "&query=%22" + search_word.gsub(" ", "+") + "%22"
  return search_string
end

def self.set_location(location, ip_address)
  if location == nil
    ll_string = ""
  elsif location == ""
    hash_ip = JSON.parse(ip_address)
    ll_string = hash_ip["data"]["latitude"].to_s + ',' + hash_ip["data"]["longitude"].to_s
  else
    lat_long_array = Geocoder.coordinates(location)
    ll_string = lat_long_array[0].to_s + ',' + lat_long_array[1].to_s
  end
  location_input = "&ll="+ll_string+"&radius="
  if location_input == "&ll="
    return ""
  else
    return location_input
  end
end



def self.set_radius(radius)
  radius = radius.to_f * 1600
  radius.to_s
end
end
