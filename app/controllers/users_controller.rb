
class UsersController < ApplicationController
  before_action :require_login, only: [:profile]

  def create
    user = User.create(user_params)
    auto_login(user)
    default_category = Category.create(name: "All")
    user.categories << default_category
    respond_to do |format|
      format.json {render :json => user.to_json}
      format.html {redirect_to event_path}
    end

  end


  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
