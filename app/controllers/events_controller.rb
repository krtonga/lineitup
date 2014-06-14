
class EventsController < ApplicationController

  def index
    @user = User.new
  end

  def show
    @event = Event.new(event_params)
  end

  def new
  end

  def create
    new_event = Event.new(event_params)
    redirect_to event_path(new_event)
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
    event_params = params.require(:event).permit(:name, :category)
  end

end
