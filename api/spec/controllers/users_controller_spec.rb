require "rails_helper"
require "shared_examples"
include JsonWebToken

RSpec.describe UsersController, type: :controller do
  describe "POST register" do
    context "success create a user when user have avatar" do
      let(:user_params) {attributes_for :user, :with_avatar}
      before do
        post :register, params: user_params
      end

      include_examples "should return the correct status code", 201

      it "database has a new user" do
        expect(User.exists?(email: user_params[:email])).to be true
      end
    end

    context "success create a user when user don't have avatar" do
      let(:user_params) {attributes_for :user}
      before do
        post :register, params: user_params
      end

      include_examples "should return the correct status code", 201

      it "database has a new user" do
        expect(User.exists?(email: user_params[:email])).to be true
      end
    end

    context "fail create a user" do
      let(:user_params) {attributes_for :user, password: "123456"}

      before do
        post :register, params: user_params
      end

      include_examples "should return the correct status code", 422

      it "database has not a new user" do
        expect(User.exists?(email: user_params[:email])).to be false
      end
    end
  end

  describe "PUT update_password" do
    let(:user) {create :user}
    newPassword = "newPassword"
    oldPassword = "12345678"
    oldPasswordWrong = "oldPasswordWrong"
    newPasswordInvalid = "invalid"

    context "success update password" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update_password, params: {old_password: oldPassword, password: newPassword}
      end

      include_examples "should return the correct status code", 200

      it "password updated" do
        user.reload
        expect(user.authenticate(newPassword)).to be_truthy
      end
    end

    context "fail update password when old_password wrong" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update_password, params: {old_password: oldPasswordWrong, password: newPassword}
      end

      include_examples "should return the correct status code", 400

      it "password has not changed" do
        user.reload
        expect(user.authenticate(newPassword)).to be false
      end
    end

    context "fail update password when password invaild" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update_password, params: {old_password: oldPassword, password: newPasswordInvalid}
      end

      include_examples "should return the correct status code", 400

      it "password has not changed" do
        user.reload
        expect(user.authenticate(newPassword)).to be false
      end
    end
  end
end
