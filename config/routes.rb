Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get '/dictionary/index', to: "dictionary#index"
  get '/dictionary/new',to: 'dictionary#new'
  get '/dictionary/save_dictionary',to: 'dictionary#save_dictionary'
  get '/dictionary/english_tests',to: 'dictionary#english_tests'
  get '/dictionary/regular_irregular_verbs',to: 'dictionary#regular_irregular_verbs'
  post '/dictionary/create',to: 'dictionary#create'
  post '/dictionary/destroy/:id',to: 'dictionary#destroy'
  post '/dictionary/edit/:id',to: 'dictionary#edit'
  root to: 'home#index'

end
