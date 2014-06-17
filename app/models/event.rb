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

def self.set_location(location)
  if location == nil
    location = ""
  end
  location_input = "&ll="+location
  if location_input == "&ll="
    return ""
  else
    return location_input
  end
end


end
