require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe AuthenticationController, type: :controller do
  describe "post login" do
    let!(:user) {create :user, email: "nguyenthaingoc@gmail.com", password: "12345678"}
    context "success login" do
      before do
        post :login, params: {email: "nguyenthaingoc@gmail.com", password: "12345678"}
      end

      it "return correct token" do
        data = JSON.parse(response.body)
        expect(jwt_decode(data["token"])["user_id"]).equal? user.id
      end

      include_examples "should return the correct status code", 200
    end

    context "fail login when wrong password" do
      before do
        post :login, params: {email: "nguyenthaingoc@gmail.com", password: "123456789"}
      end

      include_examples "should return the correct status code", 401
    end

    context "fail login when wrong email" do
      before do
        post :login, params: {email: "nguyenthaingoc123@gmail.com", password: "123456788"}
      end

      include_examples "should return the correct status code", 401
    end
  end


end
