Rails.application.routes.draw do

  # thêm prefix
  scope 'api' do
    post "/auth/login", to: "authentication#login"
    post "/auth/register", to: "users#register"

    #thông tin người dùng
    get "/users", to: "user_infos#index"
    get "/users/:id", to: "user_infos#show"
    put "/users", to: "user_infos#update"
    put "/users/password", to: "users#update_password"
    delete "/users/avatar", to: "user_infos#delete_avatar"

    #upload ảnh
    get "/images/:id", to: "images#show"
    post "/images", to: "images#create"
    delete "/images", to: "images#deletes"

    #bài viết
    get "/posts/:id", to: "posts#show"
    get "/posts", to: "posts#index"
    post "/posts", to: "posts#create"
    put "/posts/:id", to: "posts#update"
    delete "/posts/:id", to: "posts#destroy"

    #comment
    get "/comments/:post_id", to: "post_comments#show" #lấy comment cho 1 bài viết

    #biểu cảm với bình luận
    post "/comments/reacts", to: "reacts_post_comments#create"
    delete "/comments/unreact/:comment_id", to: "reacts_post_comments#destroy"

    #tạo bình luận
    post "/comments", to: "post_comments#create"
    put "/comments/:id", to: "post_comments#update"
    delete "/comments/:id", to: "post_comments#destroy"

    #react
    post "/posts/reacts", to: "reacts_posts#create"
    delete "/posts/unreact/:post_id", to: "reacts_posts#destroy"

    #Bạn bè
    get "/friends/request", to: "friends#get_request" # lấy ra tất cả danh sách lời mời kết bạn
    get "/friends/block", to: "friends#get_block" # lấy ra tất cả danh sách đã chặn
    get "/friends/:id", to: "friends#show" # lấy ra tất cả danh sách bạn bè của user_id = id
    get "/friends", to: "friends#index" # lấy ra tất cả danh sách bạn bè của bản thân
    post "/friends", to: "friends#create" # gửi lời mời kết bạn
    put "/friends", to: "friends#update"  # chấp nhận lời mời, block, chuyển loại bạn bè
    delete "/friends", to: "friends#destroy" # xóa lời mời kết bạn, xóa bạn bè
  end
end
