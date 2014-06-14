
class WelcomeController < ApplicationController
  def index

    @ip = request.remote_ip
    @secret = ENV["KEY1"] || KEY1
    redirect_to event_path
  end
end
