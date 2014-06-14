
class SessionsController < ApplicationController



  def create
    user = login(params[:email], params[:password])
    respond_to do |format|
      format.json {render :json => user.to_json}
      format.html {redirect_to event_path}
    end
  end

  def destroy
    logout
    respond_to do |format|
      format.json {render :json => {message: "hello"}}
      format.html {redirect_to '/'}
    end
  end

end
