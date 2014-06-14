
class SessionsController < ApplicationController

  def new
  end

  def create
    user = login(params[:email], params[:password])
    respond_to do |format|
      format.json {render :json => user.to_json}
      format.html {redirect_to event_path}
    end
  end

  def destroy
    logout
    redirect_to root_path
  end

end
