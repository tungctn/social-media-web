require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe ImagesController, type: :controller do
  describe "POST create" do
    let(:user) {create :user}
    context "success create a image" do
      let(:image_params) {attributes_for :image}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: image_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new user" do
        data = JSON.parse(response.body)
        expect(Image.exists?(id: data["image"]["id"])).to be true
      end
    end

    context "fail create a image" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create
      end

      include_examples "should return the correct status code", 422
    end
  end
end
