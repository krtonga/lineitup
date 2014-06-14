Rails.application.routes.draw do

  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/sessions' => 'sessions#destroy', as: 'logout'

  post '/users' => 'users#create', as: 'users'

  get 'events/profile' => 'events#profile', as: 'profile'

  root 'welcome#index'
  get '/events' => 'events#index', as: 'event'
  post '/events' => 'events#create'
  get '/events/list' => 'events#list', as: 'event_list'
  get '/events/show' => 'events#show'

end
