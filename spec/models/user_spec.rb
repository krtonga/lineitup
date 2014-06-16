require 'rails_helper'

RSpec.describe User, :type => :model do
  before :each do
    @user = User.new(email: "JD", crypted_password: "JD")
  end

  it "has two parameters" do
    expect(@user).to be_an_instance_of(User)
  end

  it "can be saved to the database" do
    @user = User.new
  end

  it "can save individual events" do
    user.events = Event.new
  end
end
