Rails.application.routes.draw do

  # thêm prefix
  scope 'api' do
    post "/auth/login", to: "authentication#login"
    post "/auth/register", to: "users#register"

    #thông tin người dùng
    get "/users/:id", to: "users#info_index"
    get "/users", to: "users#info_current_user"
    put "/users", to: "users#info_update"
    put "/users/password", to: "users#update_password"
    delete "/users/avatar", to: "users#info_delete_avatar"

    #upload ảnh
    get "/images/:id", to: "images#show"
    post "/images", to: "images#create"
    delete "/images", to: "images#deletes"

    #bài viết
    get "/posts/:id", to: "posts#show"
    get "/posts", to: "posts#get_all"
    post "/posts", to: "posts#create"
    put "/posts/:id", to: "posts#update"
    delete "/posts/:id", to: "posts#delete"

    #comment
    post "/comments", to: "posts#create_comment"
    put "/comments/:id", to: "posts#update_comment"
    delete "/comments/:id", to: "posts#delete_comment"

    #react
    post "/posts/reacts", to: "posts#react_post"
    post "/posts/unreact/:post_id", to: "posts#unreact_post"

    #Bạn bè
    get "/friends/request", to: "friends#get_request" # lấy ra tất cả danh sách lời mời kết bạn
    get "/friends/block", to: "friends#get_block" # lấy ra tất cả danh sách đã chặn
    get "/friends/:id", to: "friends#get_all" # lấy ra tất cả danh sách bạn bè của user_id = id
    get "/friends", to: "friends#get_all" # lấy ra tất cả danh sách bạn bè của bản thân
    post "/friends", to: "friends#create" # gửi lời mời kết bạn
    put "/friends", to: "friends#update"  # chấp nhận lời mời, block, chuyển loại bạn bè
    delete "/friends", to: "friends#delete" # xóa lời mời kết bạn, xóa bạn bè
  end
end
