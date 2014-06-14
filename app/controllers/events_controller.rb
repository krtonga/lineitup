
class EventsController < ApplicationController
  before_action :require_login, only: [:profile]

  def index
    @user = User.new
  end

  def show
    classical = Event.pullAPI
    respond_to do |format|
      format.html
      format.json {render json: classical.to_json}
    end
  end

  def new
  end

  def profile
    @user = User.find(current_user.id)

  end


  def create
    event = Event.create(event_params)
    respond_to do |format|
      format.json {render :json => event.to_json}
      format.html {redirect_to '/events'}
    end
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update

    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to event_path(event)
  end

  def destroy
    event.delete(params[:id])
    redirect_to events_path
  end

  private
  def event_params
    event_params = params.require(:event).permit(:name)
  end

end
