
class WelcomeController < ApplicationController
  def index
    @secret = ENV["KEY1"]
  end
end
