require_relative "../enum/enum.rb"

class FriendsController < ApplicationController
  # lấy ra tất cả bạn bè
  def get_all
    friends = nil

    if !params[:page_index] || !params[:page_size]
      friends = Friend.all.order("created_at desc")
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      friends = Friend.limit(params[:page_size].to_i).offset(skip).order("created_at desc")
    end

    render json: { friends: friends }, status: :ok
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
end
