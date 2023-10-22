require_relative "../enum/enum.rb"

class FriendsController < ApplicationController
  skip_before_action :authenticate_request, only: [:get_all]

  # lấy ra tất cả bạn bè
  def get_all
    get_current_user() # gán current_user nếu có token truyền lên

    user_id = nil

    if params[:id]
      user_id = params[:id]
    else
      user_id = @current_user.id
    end

    if !user_id
      render json: { errors: "Chưa có thông tin người dùng." }, status: :ok
      return
    end

    friend_datas = get_friends(user_id, Enums::FRIEND_STATUS[:accept])

    render json: { friends: friend_datas }, status: :ok
  end

  # lấy ra tất cả lời mời kết bạn
  def get_request
    friend_datas = get_friends_request(@current_user.id)

    render json: { friends: friend_datas }, status: :ok
  end

  # gửi kết bạn
  def create
    current_user_id = @current_user.id
    receiver_id = params[:receiver_id]

    if !validate_receiver(receiver_id)
      return
    end

    if friend_request_exist(current_user_id, receiver_id)
      render json: { errors: "Bạn đã gửi kết bạn cho người nhận." }, status: :bad_request
      return
    end

    if friend_request_exist(receiver_id, current_user_id)
      render json: { errors: "Bạn đã nhận lời mời kết bạn từ người nhận." }, status: :bad_request
      return
    end

    friend_request = Friend.new
    friend_request.sender_id = current_user_id
    friend_request.receiver_id = receiver_id
    friend_request.friend_status = Enums::FRIEND_STATUS[:pending]
    friend_request.friend_type = Enums::FRIEND_TYPE[:none]

    if friend_request.save
      render json: { message: "Thành công." }, status: :ok
    else
      render json: { errors: friend_request.errors.full_messages }, status: :bad_request
    end
  end

  # cập nhật tình trạng bạn bè
  def update
    current_user_id = @current_user.id
    receiver_id = params[:receiver_id]

    if !validate_receiver(receiver_id)
      return
    end

    friend_request = nil

    if friend_request_exist(current_user_id, receiver_id)
      friend_request = get_friend_request(current_user_id, receiver_id)
    elsif friend_request_exist(receiver_id, current_user_id)
      friend_request = get_friend_request(receiver_id, current_user_id)
    else
      render json: { errors: "Không tìm thấy để cập nhật." }, status: :bad_request
      return
    end

    friend_status = params[:friend_status]
    friend_type = params[:friend_type]

    if friend_status
      friend_request.friend_status = friend_status
    end

    if friend_type
      friend_request.friend_type = friend_type
    end

    if friend_request.save
      render json: { message: "Thành công." }, status: :ok
    else
      render json: { errors: friend_request.errors.full_messages }, status: :bad_request
    end
  end

  # xóa lời mời kết bạn, hủy kết bạn
  def delete
    current_user_id = @current_user.id
    receiver_id = params[:receiver_id]

    if !validate_receiver(receiver_id)
      return
    end

    friend_request = nil

    if friend_request_exist(current_user_id, receiver_id)
      friend_request = get_friend_request(current_user_id, receiver_id)
    elsif friend_request_exist(receiver_id, current_user_id)
      friend_request = get_friend_request(receiver_id, current_user_id)
    else
      render json: { errors: "Không tìm thấy để xoá." }, status: :bad_request
      return
    end

    if friend_request.destroy
      render json: { message: "Thành công." }, status: :ok
    else
      render json: { errors: friend_request.errors.full_messages }, status: :bad_request
    end
  end

  private

  # kiểm tra người nhận lời mời
  # param: <receiver_id> - người nhận lời mời
  def validate_receiver(receiver_id)
    # check xem đã gửi receiver_id lên chưa
    if !receiver_id
      render json: { errors: "Chưa gửi id của người nhận." }, status: :bad_request
      return false
    end

    # check xem id người nhận có trùng với id của người dùng đăng nhập không
    if receiver_id == @current_user.id
      render json: { errors: "Không thể gửi lời mời cho chính mình." }, status: :bad_request
      return false
    end

    # check xem ng nhận có tồn tại không
    receiver = User.find_by_id(receiver_id)

    if !receiver
      render json: { errors: "Người nhận lời mời không tồn tại." }, status: :bad_request
      return false
    end

    return true
  end

  # lấy lời mời kết bạn
  # param: <sender_id> - người gửi lời mời
  #        <receiver_id> - người nhận lời mời
  def get_friend_request(sender_id, receiver_id)
    friend_request = Friend.find_by(receiver_id: receiver_id, sender_id: sender_id)
    return friend_request
  end

  # check xem có lời mời kết bạn chưa
  # param: <sender_id> - người gửi lời mời
  #        <receiver_id> - người nhận lời mời
  def friend_request_exist(sender_id, receiver_id)
    friend_request = get_friend_request(sender_id, receiver_id)

    if friend_request
      return true
    else
      return false
    end
  end

  # lấy thông bạn bè thông tin bản ghi trong bảng friends
  # param: <sender_id> - người gửi lời mời
  #        <receiver_id> - người nhận lời mời
  #        <friend_status> - trạng thái lời mời
  def get_friends(user_id, friend_status)
    friends = nil

    if !params[:page_index] || !params[:page_size]
      friends = Friend.where("(receiver_id = ? OR sender_id = ?) AND friend_status = ?", user_id, user_id, friend_status)
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      friends = Friend.limit(params[:page_size].to_i).offset(skip).where("(receiver_id = ? OR sender_id = ?) AND friend_status = ?", user_id, user_id, friend_status)
    end

    friend_datas = []

    friends.each do |friend|
      friend_info = nil

      if friend.sender_id == user_id
        friend_info = UserInfo.select(:full_name, :avatar_url, :user_id).find_by(user_id: friend.receiver_id)
      else
        friend_info = UserInfo.select(:full_name, :avatar_url, :user_id).find_by(user_id: friend.sender_id)
      end

      friend_datas.push(friend_info)
    end

    return friend_datas
  end

  # lấy thông tin người gửi lời mời kết bạn
  # param: <receiver_id> - người nhận lời mời
  def get_friends_request(receiver_id)
    friends = nil

    if !params[:page_index] || !params[:page_size]
      friends = Friend.where("receiver_id = ? AND friend_status = ?", receiver_id, Enums::FRIEND_STATUS[:pending])
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      friends = Friend.limit(params[:page_size].to_i).offset(skip).where("receiver_id = ? AND friend_status = ?", receiver_id, Enums::FRIEND_STATUS[:pending])
    end

    friend_datas = []

    friends.each do |friend|
      friend_info = UserInfo.select(:full_name, :avatar_url, :user_id).find_by(user_id: friend.sender_id)

      friend_datas.push(friend_info)
    end

    return friend_datas
  end
end
