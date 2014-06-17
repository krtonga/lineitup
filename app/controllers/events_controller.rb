
class EventsController < ApplicationController
  before_action :require_login, only: [:profile, :create, :userevents]



  def index
    @user = User.new
    @ip = request.location
  end

  def show
    results = Event.pullAPI(params[:filter])
    respond_to do |format|
      format.html
      format.json {render json: results.to_json}
    end
  end


  def list
    @ip = request.location

    @user = User.new
    @p = params
    @filter_string = Event.make_category_filter(params)
    if params[:search_word] != ""
      query_string = Event.make_search_query(params[:search_word])
    else
      query_string = ""
    end
    location_update = Event.set_location(params[:location])
    @filter_string += query_string
    @filter_string += location_update
    @start = params[:start_date]
    @end = params[:end_date]

  end

  # def new
  # end

  def userevents
    curr_user = User.find(current_user.id)
    results = curr_user.events
    #@test = results[1]
    respond_to do |format|
      format.html {render :profile}
      format.json {render json: results.to_json}
    end
  end

  # def profile


  # end


  def create
    event = Event.where(event_id: event_params["event_id"]).take
    if event == nil
      event = Event.create(event_params)
    end
    default_category = Category.where(user_id: current_user.id, name: 'All').take
    default_category.events << event
    respond_to do |format|
      format.json {render :json => event.to_json}
      format.html {redirect_to '/events'}
    end
  end

  # def edit
  #   @event = Event.find(params[:id])
  # end

  # def update

  #   @event = Event.find(params[:id])
  #   @event.update(event_params)
  #   redirect_to event_path(event)
  # end

  def destroy
    user = User.find(current_user.id)
    user_categories = user.categories
    @p = event_params
    event = Event.where(event_id: event_params[:event_id]).take
    user_categories.each do |category|
      hap = Hap.where(category_id: category.id, event_id: event.id).take
      Hap.delete(hap.id)
    end
    respond_to do |format|
      format.json {render :json => {message: "hello"}}
      format.html {redirect_to '/events/userevents'}
    end

  end

  private
  def event_params
    event_params = params.require(:event).permit(:event_name,
                                                 :category,
                                                 :end_date,
                                                 :start_date,
                                                 :recurstring,
                                                 :event_detail_url,
                                                 :web_description,
                                                 :recurring_start_date,
                                                 :recurring_end_date,
                                                 :recur_days,
                                                 :venue_name,
                                                 :venue_detail_url,
                                                 :geocode_latitude,
                                                 :geocode_longitude,
                                                 :street_address,
                                                 :telephone,
                                                 :venue_website,
                                                 :event_date_list,
                                                 :event_id,
                                                 :free
                                                 )
  end



end
