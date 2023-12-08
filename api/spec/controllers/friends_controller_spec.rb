require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe FriendsController, type: :controller do
  let(:user1) {create :user}
  let(:user2) {create :user}
  describe "POST create" do
    context "success create a friend" do
      let(:friend_params) {attributes_for :friend, sender_id: user1.id, receiver_id: user2.id}
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: friend_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new friend" do
        data = JSON.parse(response.body)
        expect(Friend.exists?(id: data["friend"]["id"])).to be true
      end
    end

    context "fail create a friend when friend request exist" do
      let!(:friend) {create :friend, sender_id: user1.id, receiver_id: user2.id}
      let(:friend_params) {attributes_for :friend, sender_id: user1.id, receiver_id: user2.id}
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: friend_params
      end

      include_examples "should return the correct status code", 400
    end

    context "fail create a friend when receiver id = sender id" do
      let(:friend_params) {attributes_for :friend, sender_id: user1.id, receiver_id: user1.id}
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: friend_params
      end

      include_examples "should return the correct status code", 400
    end

    context "fail create a friend when receiver has been send friend to receiver" do
      let!(:friend) {create :friend, sender_id: user2.id, receiver_id: user1.id}
      let(:friend_params) {attributes_for :friend, sender_id: user1.id, receiver_id: user2.id}
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: friend_params
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "GET index" do
    let!(:user_info) {create :user_info, user_id: user2.id, gender: 1}
    let!(:friend_list) {create_list :friend, 10, :accept, sender_id: user1.id, receiver_id: user2.id}
    context "success get all friend" do
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index
      end

      it "get correct friends quantity" do
        data = JSON.parse(response.body)
        expect(data["friends"].length).to be 10
      end

      include_examples "should return the correct status code", 200
    end

    context "success get all friend when have page_size page_index" do
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index, params: {page_size: 5, page_index: 1}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["friends"].length).to be 5
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET get_request" do
    let!(:user_info1) {create :user_info, user_id: user1.id, gender: 1}
    let!(:user_info2) {create :user_info, user_id: user2.id, gender: 1}
    let!(:friend_list) {create_list :friend, 10, :pending, sender_id: user1.id, receiver_id: user2.id}
    context "success get all friend" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_request
      end

      it "get correct friends quantity" do
        data = JSON.parse(response.body)
        expect(data["friends"].length).to be 10
      end

      include_examples "should return the correct status code", 200
    end

    context "success get all friend when have page_size page_index" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_request, params: {page_size: 5, page_index: 1}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["friends"].length).to be 5
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET show" do
    let!(:user_info) {create :user_info, user_id: user2.id, gender: 1}
    let!(:friend) {create_list :friend, 10, :accept, sender_id: user1.id, receiver_id: user2.id}
    context "success get all friend" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: user1}
      end

      it "get correct friends quantity" do
        data = JSON.parse(response.body)
        expect(data["friends"].length).to be 10
      end

      include_examples "should return the correct status code", 200
    end

    context "success get all friend when have page_size page_show" do
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: user1, page_size: 5, page_index: 1}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["friends"].length).to be 5
      end

      include_examples "should return the correct status code", 200
    end

    context "fail get all friend" do
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "PUT update" do
    let!(:friend) {create :friend, :pending, sender_id: user1.id, receiver_id: user2.id}
    context "success update a friend" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {receiver_id: user1.id, friend_status: 2, friend_type: 1}
      end

      include_examples "should return the correct status code", 200

      it "status updated" do
        friend.reload
        expect(friend.friend_status).equal? 2
      end

      it "type updated" do
        friend.reload
        expect(friend.friend_type).equal? 1
      end
    end

    context "fail update a friend" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {friend_status: 2, friend_type: 1}
      end

      include_examples "should return the correct status code", 400
    end

    context "fail update a friend" do
      let(:user3) {create :user}
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {receiver_id: user3.id, friend_status: 2, friend_type: 1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELEETE destroy" do
    let!(:friend) {create :friend, :pending, sender_id: user1.id, receiver_id: user2.id}
    context "success delete a friend" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {receiver_id: user1.id}
      end

      it "remove friend from database" do
        expect { friend.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "success delete a friend" do
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {receiver_id: user2.id}
      end

      it "remove friend from database" do
        expect { friend.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "fail delete a friend" do
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {receiver_id: -1}
      end

      it "should not delete the friend" do
        expect(Friend.where(id: friend.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end

    context "fail delete a friend" do
      let(:user3) {create :user}
      before do
        token_new = jwt_encode({user_id: user2.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {receiver_id: user3.id}
      end

      it "should not delete the friend" do
        expect(Friend.where(id: friend.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end

    context "fail when destroy fail" do
      before do
        token_new = jwt_encode({user_id: user1.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        allow_any_instance_of(Friend).to receive(:destroy).and_return(false)
        delete :destroy, params: {receiver_id: user2.id}
      end
      it "should not delete the friend" do
        expect(Friend.where(id: friend.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end
  end
end
