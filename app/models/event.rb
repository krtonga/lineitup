class Event < ActiveRecord::Base
  has_many :haps
  has_many :categories, through: :haps

  def self.pullAPI(category_filter)
    #classical = HTTParty.get('http://api.nytimes.com/svc/events/v2/listings.json?&filters=category:Classical&api-key=69462cbe1e0c66627933f3d16c4325c0:7:1730473&limit=5000')
    #classical = HTTParty.get('http://api.nytimes.com/svc/events/v2/listings.json?&filters=category:Classical&api-key='+API_KEYS[:KEY1]+'&limit=5000')
    #classical = HTTParty.get('http://api.nytimes.com/svc/events/v2/listings.json?&filters=category:Theater&api-key='+KEY1+'&limit=5000')
    classical = HTTParty.get('http://api.nytimes.com/svc/events/v2/listings.json?&filters=category:'+category_filter+'&api-key='+KEY1+'&limit=5000')
    get_uniq_results = {}
    classical["results"].each do |event|
      get_uniq_results[event["event_id"]] = event
    end

    return get_uniq_results.values
    #binding.pry
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

    return "(" + search_string.chop + ")"


  end

end
