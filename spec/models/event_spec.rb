require 'rails_helper'

RSpec.describe Event, :type => :model do
  before :each do
    @event = Event.new(name: "Opera Cabal", category: "Classical")
  end

  it "has at least a name and a category" do
    expect(@event).to be_an_instance_of(Event)
  end

  it "can be saved to the database" do
   @event = Event.new

 end

end
