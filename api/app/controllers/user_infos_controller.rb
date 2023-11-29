require_relative "../enum/enum.rb"

class UserInfosController < ApplicationController
  #region Thông tin người dùng

  #lấy thông tin người dùng qua token
  #created by: ttanh (02/10/2023)
  def index
    friends_count = Friend.where("(sender_id = #{@current_user.id} OR receiver_id = #{@current_user.id}) AND friend_status = #{Enums::FRIEND_STATUS[:accept]}").count;
    render json: { user_info: @current_user.user_info, email: @current_user.email, user_id: @current_user.id, role: @current_user.role, friends_count: friends_count }, status: :ok
  end

  # lấy thông tin người dùng bất kì
  # created by: ttanh (24/09/2023)
  def show
    user = get_user_by_id(params[:id])

    user_info = user.user_info

    friend = {
      friend_status: nil,
      is_sender: nil
    }

    friend_request = nil
    friend_request = Friend.find_by(receiver_id: @current_user.id, sender_id: user.id)

    if !friend_request
      friend_request = Friend.find_by(sender_id: @current_user.id, receiver_id: user.id)

      if friend_request
        friend["friend_status"] = friend_request.friend_status
        friend["is_sender"] = true
      end
    else
      friend["friend_status"] = friend_request.friend_status
      friend["is_sender"] = false
    end

    # danh sách bạn bè của nguời dùng đang muốn xem
    user_friends = Friend.where("(sender_id = #{user.id} OR receiver_id = #{user.id}) AND friend_status = #{Enums::FRIEND_STATUS[:accept]}");
    user_friend_ids = [];

    user_friends.each do |user_friend|
      if user_friend.sender_id != @current_user.id && user_friend.sender_id != user.id
        user_friend_ids.push(user_friend.sender_id)
      end

      if user_friend.receiver_id != @current_user.id && user_friend.receiver_id != user.id
        user_friend_ids.push(user_friend.receiver_id)
      end
    end

    # danh sách của người dùng đang đăng nhập để kiểm tra bạn chung
    my_friends = Friend.where("(sender_id = #{@current_user.id} OR receiver_id = #{@current_user.id}) AND friend_status = #{Enums::FRIEND_STATUS[:accept]}");
    my_friend_ids = [];

    my_friends.each do |my_friend|
      if my_friend.sender_id != @current_user.id && my_friend.sender_id != user.id
        my_friend_ids.push(my_friend.sender_id)
      end

      if my_friend.receiver_id != @current_user.id && my_friend.receiver_id != user.id
        my_friend_ids.push(my_friend.receiver_id)
      end
    end

    manual_friends_count = my_friend_ids & user_friend_ids

    render json: { user_info: user_info, email: user.email, user_id: user.id, friend: friend, manual_friends_count: manual_friends_count.length, friends_count: user_friends.length}, status: :ok
  end

  # cập nhật thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def update
    user_info = @current_user.user_info
    if user_info.update(user_info_params)
      render json: { message: "Thành công!" }, status: :ok
      key = user_info.avatar.key if user_info.avatar.attached?
      user_info.avatar_url = "https://s3-ap-southeast-1.amazonaws.com/social-media-image/#{key}" if user_info.avatar.attached?
      user_info.save
    else
      render json: { errors: user_info.errors.full_messages },
            status: :bad_request
    end
  end

  # xóa avatar
  # created by: ttanh (26/09/2023)
  def delete_avatar
    user_info = @current_user.user_info

    if !user_info.avatar.attached?
      render json: { errors: "Người dùng chưa cài avatar" }, status: :bad_request
      return
    end

    user_info.avatar.purge
    user_info.avatar_url = nil
    user_info.save
    render json: { message: "Thành công!" }, status: :ok
  end
  #endregion

  private
  def user_info_params
    params.permit(:first_name, :last_name,
      :full_name, :phone_number,
      :date_of_birth, :gender, :avatar,
      :join_date, :last_login, :bio,
      :address, :relationship_status)
  end
end
