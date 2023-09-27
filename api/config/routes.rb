Rails.application.routes.draw do
  resources :users
  post "/auth/login", to: "authentication#login"

  #thông tin người dùng
  get "/api/user_infos/", to: "user_infos#index"
  post "/api/user_infos/", to: "user_infos#create"
  put "/api/user_infos/", to: "user_infos#update"
  delete "/api/user_infos/avatar", to: "user_infos#delete_avatar"
  delete "/api/user_infos/background", to: "user_infos#delete_background"
end
