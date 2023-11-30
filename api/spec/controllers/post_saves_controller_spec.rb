require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe PostSavesController, type: :controller do
  describe "POST create" do
    let(:user) {create :user}
    let(:user_other) {create :user}
    let!(:post1) {create :post, user_id: user_other.id}
    context "success create a post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: {id: post1.id}
      end

      include_examples "should return the correct status code", 200

      it "database has a new post save" do
        data = JSON.parse(response.body)
        expect(PostSave.exists?(user_id: user.id, post_id: post1.id)).to be true
      end
    end

    context "success create a post save when post saved" do
      let!(:post_save) {create :post_save, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: {id: post1}
      end

      include_examples "should return the correct status code", 200
    end

    context "fail create a post save when don't find post id" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: {id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "GET index" do
    let(:user) {create :user}
    let(:user_other) {create :user}
    let!(:listPost) {create_list :post, 10, user_id: user_other.id}
    context "success show all post save when have page_index and page_size" do
      before do
        for post in listPost do
          create(:post_save, user_id: user.id, post_id: post.id)
        end
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index, params: {page_index: 1, page_size:7}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["posts"].length).to be 7
      end

      include_examples "should return the correct status code", 200
    end

    context "success show all post save" do
      before do
        for post in listPost do
          create(:post_save, user_id: user.id, post_id: post.id)
        end
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET check_save" do
    let(:user) {create :user}
    context "success check save" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :check_save, params: {id: post1.id}
      end

      it "get correct is_save_post" do
        data = JSON.parse(response.body)
        expect(data["is_save_post"]).to be false
      end

      include_examples "should return the correct status code", 200
    end

    context "fail show a post when don't find id post" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :check_save, params: {id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELETE destroy" do
    let(:user) {create :user}
    let(:user_other) {create :user}
    let(:post1) {create :post, user_id: user_other.id}
    let!(:post_save) {create :post_save, user_id: user.id, post_id: post1.id}
    context "destroy success" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {id: post1.id}
      end

      it "remove post from database" do
        expect { post_save.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "fail with post save not found" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {id: -1}
      end

      include_examples "should return the correct status code", 400
    end

    context "fail when destroy fail" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        allow_any_instance_of(PostSave).to receive(:destroy).and_return(false)
        delete :destroy, params: {id: post1.id}
      end
      it "should not delete the football pitch" do
        expect(PostSave.where(id: post_save.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end
  end
end
