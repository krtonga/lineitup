
class EventsController < ApplicationController

  def index
  end

  def show
    @name = name.find(params[:id])
  end

  def new

  end

  def create
  end

  def edit
    @name = name.find(params[:id])
  end

  def update
    edited_name = Name.find(params[:id])
    name.update(params.require(:name).permit(:name)
    redirect_to "/name/#{name.id}"
  end

  def destroy
    Name.find(params[:id])
    redirect_to '/names'
  end

end
