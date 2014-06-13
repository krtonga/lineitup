
class UsersController < ApplicationController
  before_action :require_login, only: [:profile]

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    binding.pry
    default_category = Category.create(name: "All")
    @user.categories << default_category
    redirect_to login_path
  end

  def profile
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
