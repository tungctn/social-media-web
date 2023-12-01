require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe ReactsPostsController, type: :controller do
  describe "POST create" do
    let(:user) {create :user}
    let!(:post1) {create :post, user_id: user.id}
    context "success create a post" do
      let(:reacts_post_params) {attributes_for :reacts_post, :like, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(ReactsPost.exists?(user_id: user.id, post_id: post1.id, react_id: 1)).to be true
      end
    end

    context "success create a post" do
      let!(:reacts_post) {create :reacts_post, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: {user_id: user.id, post_id: post1.id, type_react: 2}
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(ReactsPost.exists?(user_id: user.id, post_id: post1.id, react_id: 2)).to be true
      end
    end

    context "fail create a post when react id not found" do
      let(:reacts_post_params) {attributes_for :reacts_post, :react_not_found, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_params
      end

      include_examples "should return the correct status code", 400
    end

    context "fail create a post when post id not found" do
      let(:reacts_post_params) {attributes_for :reacts_post, :like, user_id: user.id, post_id: -1}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_params
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELETE destroy" do
    let(:user) {create :user}
    let!(:post1) {create :post, user_id: user.id}
    context "success destroy a post and post like = 0" do
      let!(:reacts_post) {create :reacts_post, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {post_id: post1.id}
      end

      it "remove post from database" do
        expect { reacts_post.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "success destroy a post and post like > 0" do
      let(:reacts_post_params) {attributes_for :reacts_post, :like, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_params
        delete :destroy, params: {post_id: post1.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "fail with post not found" do
      let!(:reacts_post) {create :reacts_post, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {post_id: -1}
      end

      it "should not delete the football pitch" do
        expect(ReactsPost.where(id: reacts_post.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end

    context "fail with react post not found" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {post_id: post1.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "fail when destroy fail" do
      let!(:reacts_post) {create :reacts_post, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        allow_any_instance_of(ReactsPost).to receive(:destroy).and_return(false)
        delete :destroy, params: {post_id: post1.id}
      end
      it "should not delete the football pitch" do
        expect(ReactsPost.where(id: reacts_post.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end
  end
end
