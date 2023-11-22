require "rails_helper"
require "shared_examples"
include JsonWebToken

RSpec.describe UserInfosController, type: :controller do
  let(:user) {create :user}
  describe "GET index" do
    context "success show current user info" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index
      end

      it "return current user correct" do
        expect_json("user_id": user.id)
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET show" do
    context "success show user info when have a friend with sender is current user" do
      let(:user_other) {create :user}
      let!(:friend) {create :friend, :pending, sender_id: user.id, receiver_id: user_other.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: user_other.id}
      end

      it "friend_status should be pending" do
        expect_json("friend", friend_status: 1)
      end

      it "is_sender should be true" do
        expect_json("friend", is_sender: true)
      end

      include_examples "should return the correct status code", 200
    end

    context "success show user info when have a friend with receiver is current user" do
      let(:user_other) {create :user}
      let!(:friend) {create :friend, :pending, sender_id: user_other.id, receiver_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: user_other.id}
      end

      it "friend_status should be pending" do
        expect_json("friend", friend_status: 1)
      end

      it "is_sender should be false" do
        expect_json("friend", is_sender: false)
      end

      include_examples "should return the correct status code", 200
    end

    context "success show user info when don't have a friend" do
      let(:user_other) {create :user}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: user_other.id}
      end

      it "friend_status should be nil" do
        expect_json("friend", friend_status: nil)
      end

      it "is_sender should be nil" do
        expect_json("friend", is_sender: nil)
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "PUT update" do
    context "success update current user info when user have avatar" do
      let!(:user_info) {create :user_info, :with_avatar, user_id: user.id, gender: 1}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :update, params: {gender: 2}
      end

      it "gender should be 2" do
        user_info.reload
        expect(user_info.gender).to be 2
      end

      include_examples "should return the correct status code", 200
    end

    context "success update current user info when user don't avatar" do
      let!(:user_info) {create :user_info, user_id: user.id,  gender: 1}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :update, params: {gender: 2}
      end

      it "gender should be 2" do
        user_info.reload
        expect(user_info.gender).to be 2
      end

      include_examples "should return the correct status code", 200
    end

    context "fail update current user info when params is invalid" do
      let!(:user_info) {create :user_info, user_id: user.id, gender: 1}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :update, params: {gender: 10}
      end

      it "gender should be 1" do
        user_info.reload
        expect(user_info.gender).to be 1
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELETE delete_avatar" do
    context "success delete avatar when user info have avatar" do
      let!(:user_info) {create :user_info, :with_avatar, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :delete_avatar
      end

      it "avatar deleted" do
        user_info.reload
        expect(user_info.avatar.attached?).to be false
      end

      include_examples "should return the correct status code", 200
    end


    context "success delete avatar when user info don't have avatar" do
      let!(:user_info) {create :user_info, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :delete_avatar
      end

      it "avatar deleted" do
        user_info.reload
        expect(user_info.avatar.attached?).to be false
      end

      include_examples "should return the correct status code", 400
    end
  end
end
