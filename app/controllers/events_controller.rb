
class EventsController < ApplicationController

  def index
    @events = Event.all
  end

  def show
    @event = Event.new(event_params)
  end

  def new
  end

  def create

  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
  end

  def destroy
    event.delete(params[:id])
  end

private

event_params = params.require(:event).permit(:name, :category)


end
