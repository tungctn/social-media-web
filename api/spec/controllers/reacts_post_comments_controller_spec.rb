require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe ReactsPostCommentsController, type: :controller do
  let!(:like) {create :react, :like}
  let!(:love) {create :react, :love}
  describe "POST create" do
    let(:user) {create :user}
    let!(:post1) {create :post, user_id: user.id}
    let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
    context "success create a react post comment" do
      let(:reacts_post_comment_params) {attributes_for :reacts_post_comment, :like, user_id: user.id, comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_comment_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new react post comment" do
        data = JSON.parse(response.body)
        expect(ReactsPostComment.exists?(user_id: user.id, post_comment_id: post_comment.id, react_id: like.id)).to be true
      end
    end

    context "success create a react post comment" do
      let!(:reacts_post_comment) {create :reacts_post_comment, user_id: user.id, react: like, post_comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: {user_id: user.id, comment_id: post_comment.id, type_react: 2}
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(ReactsPostComment.exists?(user_id: user.id, post_comment_id: post_comment.id, react_id: love.id)).to be true
      end
    end

    context "fail create a react post comment when react id not found" do
      let(:reacts_post_comment_params) {attributes_for :reacts_post_comment, :react_not_found, user_id: user.id, comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_comment_params
      end

      include_examples "should return the correct status code", 400
    end

    context "fail create a react post comment when post id not found" do
      let(:reacts_post_comment_params) {attributes_for :reacts_post_comment, :like, user_id: user.id, comment_id: -1}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_comment_params
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELETE destroy" do
    let(:user) {create :user}
    let!(:post1) {create :post, user_id: user.id}
    let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
    context "success destroy a react post comment and post like = 0" do
      let!(:reacts_post_comment) {create :reacts_post_comment, react: like, user_id: user.id, post_comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {comment_id: post_comment.id}
      end

      it "remove post from database" do
        expect { reacts_post_comment.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "success destroy a react post comment and post like > 0" do
      let(:reacts_post_comment_params) {attributes_for :reacts_post_comment, :like, user_id: user.id, comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: reacts_post_comment_params
        delete :destroy, params: {comment_id: post_comment.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "fail with comment not found" do
      let!(:reacts_post_comment) {create :reacts_post_comment, react: like, user_id: user.id, post_comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {comment_id: -1}
      end

      it "should not delete the football pitch" do
        expect(ReactsPostComment.where(id: reacts_post_comment.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end

    context "fail with react post not found" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {comment_id: post_comment.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "fail when destroy fail" do
      let!(:reacts_post_comment) {create :reacts_post_comment, react: like, user_id: user.id, post_comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        allow_any_instance_of(ReactsPostComment).to receive(:destroy).and_return(false)
        delete :destroy, params: {comment_id: post_comment.id}
      end
      it "should not delete the football pitch" do
        expect(ReactsPostComment.where(id: reacts_post_comment.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end
  end
end
