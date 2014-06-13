
class WelcomeController < ApplicationController
  def index

    @ip = request.remote_ip
    @secret = ENV["KEY1"] || KEY1

  end
end
