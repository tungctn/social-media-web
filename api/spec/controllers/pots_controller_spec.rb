require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe PostsController, type: :controller do
  describe "POST create" do
    let(:user) {create :user}
    context "success create a post" do
      let(:post_params) {attributes_for :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(Post.exists?(id: data["post"]["id"])).to be true
      end
    end

    context "success create a share post" do
      let!(:post_old) {create :post, user_id: user.id}
      let(:post_params) {attributes_for :post, :share_post, user_id: user.id, share_id: post_old.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(Post.exists?(id: data["post"]["id"])).to be true
      end
    end

    context "success create a share post from a share post" do
      let!(:post1) {create :post, user_id: user.id}
      let!(:post2) {create :post, :share_post, user_id: user.id, share_id: post1.id}
      let(:post_params) {attributes_for :post, :share_post, user_id: user.id, share_id: post2.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(Post.exists?(id: data["post"]["id"])).to be true
      end
    end

    context "fail create a post" do
      let(:post_params) {attributes_for :post}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_params
      end

      include_examples "should return the correct status code", 422
    end
  end

  describe "GET index" do
    let(:user) {create :user}
    context "success create a post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET index" do
    let(:user) {create :user}
    context "success create a post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET index" do
    let(:user) {create :user}
    let!(:listPost) {create_list :post, 10, :active, user_id: user.id}
    context "success show all post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :index, params: {page_index: 3, page_size:7}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["posts"].length).to be 7
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "GET show" do
    let(:user) {create :user}
    context "success show a post" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: post1.id}
      end

      it "get correct post" do
        data = JSON.parse(response.body)
        expect(data["post"]["id"]).to be post1.id
      end

      include_examples "should return the correct status code", 200
    end

    context "success show a post when post is share post" do
      let!(:post1) {create :post, user_id: user.id}
      let!(:post2) {create :post, :share_post, user_id: user.id, share_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: post2.id}
      end

      it "get correct post" do
        data = JSON.parse(response.body)
        expect(data["post"]["id"]).to be post2.id
      end

      it "get correct share id" do
        data = JSON.parse(response.body)
        expect(data["post"]["share_id"]).to be post1.id
      end

      include_examples "should return the correct status code", 200
    end

    context "fail show a post when don't find id post" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "GET myPost" do
    let(:user) {create :user}
    let!(:listPost) {create_list :post, 10, :active, user_id: user.id}
    context "success show my post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :my_post
      end

      it "get correct posts" do
        data = JSON.parse(response.body)
        expect(data["posts"].map{ |post| post["id"]}.should =~ listPost.map{ |post| post["id"]}.reverse).to be true
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "PUT update" do
    let(:user) {create :user}
    context "success update a post" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {content: "content updated", id: post1.id}
      end

      it "content updated" do
        post1.reload
        expect(post1.content).equal? "content updated"
      end

      include_examples "should return the correct status code", 200
    end

    context "success update a post when update images" do
      let(:post1) {create :post, user_id: user.id}
      let(:image) {create :image}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {content: "content updated", image_ids: [image.id], id: post1.id}
      end

      it "content updated" do
        post1.reload
        expect(post1.content).equal? "content updated"
      end

      include_examples "should return the correct status code", 200
    end

    context "fail update a post when don't find id post" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {content: "content updated", id: -1}
      end

      include_examples "should return the correct status code", 400
    end

    context "fail update a post when don't have permission" do
      let(:user_other) {create :user}
      let(:post1) {create :post, user_id: user_other.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {content: "content updated", id: post1.id}
      end

      include_examples "should return the correct status code", 403
    end

    context "fail update a post when params invalid" do
      let(:post1) {create :post, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {content: nil, id: post1.id}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELETE destroy" do
    let(:user) {create :user}
    let!(:post1) {create :post, user_id: user.id}
    context "destroy success" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {id: post1.id}
      end

      it "remove post from database" do
        expect { post1.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "fail with post not found" do
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
        allow_any_instance_of(Post).to receive(:destroy).and_return(false)
        delete :destroy, params: {id: post1.id}
      end
      it "should not delete the football pitch" do
        expect(Post.where(id: post1.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end

    context "fail destroy a post when don't have permission" do
      let(:user_other) {create :user}
      let(:post1) {create :post, user_id: user_other.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: {id: post1.id}
      end

      include_examples "should return the correct status code", 403
    end
  end

  describe "GET show_user_post" do
    let(:user) {create :user}
    let(:user_other) {create :user}
    let!(:listPost) {create_list :post, 10, :active, user_id: user_other.id}
    context "success show_user_post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show_user_post, params: {id: user_other.id}
      end

      it "get correct posts" do
        data = JSON.parse(response.body)
        expect(data["posts"].map{ |post| post["id"]}.should =~ listPost.map{ |post| post["id"]}.reverse).to be true
      end

      include_examples "should return the correct status code", 200
    end

    context "fail show a post when don't find id post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show_user_post, params: {id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "GET newest_post" do
    let(:user) {create :user}
    context "success show newest_post" do
      let!(:post1) {create :post, :active, user_id: user.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :newest_post
      end

      it "get correct post" do
        data = JSON.parse(response.body)
        expect(data["posts"]["id"]).to be post1.id
      end

      include_examples "should return the correct status code", 200
    end

    context "have not newest_post" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :newest_post
      end

      it "get correct post" do
        data = JSON.parse(response.body)
        expect(data["posts"]).to be nil
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "get search" do
    let(:user) {create :user}
    context "success show newest_post" do
      let!(:post1) {create :post, :active, user_id: user.id, content: "Content example"}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :search, params: {text_search: "Content"}
      end

      it "get correct post" do
        data = JSON.parse(response.body)
        expect(data["data_search"][0]["id"]).to be post1.id
      end

      include_examples "should return the correct status code", 200
    end

    context "success show newest_post" do
      let!(:post1) {create :post, :active, user_id: user.id, content: "Content example"}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :search, params: {text_search: ""}
      end

      it "get correct post" do
        data = JSON.parse(response.body)
        expect(data["data_search"][0]["id"]).to be post1.id
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "post report" do
    let(:user) {create :user}
    let(:user_other) {create :user}
    context "success report" do
      let!(:post1) {create :post, :active, user_id: user_other.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :report, params: {type_report: 1, id: post1.id}
      end

      it "status updated" do
        post1.reload
        expect(post1.status).to be 2
      end

      it "type_report updated" do
        post1.reload
        expect(post1.type_report).to be 1
      end

      include_examples "should return the correct status code", 200
    end

    context "fail report when not found post" do
      let!(:post1) {create :post, :active, user_id: user_other.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :report, params: {type_report: 1, id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end
end
