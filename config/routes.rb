Rails.application.routes.draw do

  #get '/login' => 'sessions#new', as: 'login'
  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/sessions' => 'sessions#destroy', as: 'logout'

  get '/signup' => 'users#new', as: 'signup'
  post '/users' => 'users#create', as: 'users'

  get '/profile' => 'users#profile', as: 'profile'


  #resources :events



  root 'events#index'
  get '/events' => 'events#index', as: 'event'

end
