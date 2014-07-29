Rails.application.routes.draw do

  root 'events#list'    # we are using this

  post '/sessions' => 'sessions#create', as: 'sessions'  #using this
  delete '/sessions' => 'sessions#destroy', as: 'logout'   #using this

  post '/users' => 'users#create', as: 'users'   #we are using this also

  post '/events' => 'events#create'  #we are using this
  get '/events/list' => 'events#list', as: 'event_list'  #we are using this
  get '/events/show' => 'events#show'  # we are using this
  get '/events/userevents' => 'events#userevents'
  delete '/events' => 'events#destroy'


end
