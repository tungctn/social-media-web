Rails.application.routes.draw do
  resources :users
  post "/auth/login", to: "authentication#login"

  #thông tin người dùng
  get "/user_infos/", to: "user_infos#index"
  post "/user_infos/", to: "user_infos#create"
  put "/user_infos/", to: "user_infos#update"
  delete "/user_infos/avatar", to: "user_infos#delete_avatar"
  delete "/user_infos/background", to: "user_infos#delete_background"
end
