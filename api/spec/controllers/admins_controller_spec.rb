require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe AdminsController, type: :controller do
  describe "get get_post_report" do
    let(:user_admin) {create :user, :admin}
    let(:user) {create :user, :not_admin}
    let!(:listPost) {create_list :post, 10, :pending, :report_content, user_id: user.id}
    context "success get all post reprot" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_post_report
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["posts"].length).to be 10
      end

      it "get correct posts" do
        data = JSON.parse(response.body)
        expect(data["posts"].map{ |post| post["id"]}.should =~ listPost.map{ |post| post["id"]}.reverse).to be true
      end

      include_examples "should return the correct status code", 200
    end

    context "success get all post reprot when have page_size page_index" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_post_report, params: {page_size: 5, page_index: 1}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["posts"].length).to be 5
      end

      it "get correct posts" do
        data = JSON.parse(response.body)
        expect(data["posts"].map{ |post| post["id"]}.should =~ listPost.drop(5).map{ |post| post["id"]}.reverse).to be true
      end

      include_examples "should return the correct status code", 200
    end

    context "success get all post reprot when have page_size page_index" do
      let(:post1) {create :post, :pending, :report_content, user_id: user.id}
      let!(:post2) {create :post, :pending, :report_content, :share_post, user_id: user.id, share_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_post_report
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["posts"].length).to be 12
      end

      include_examples "should return the correct status code", 200
    end

    context "fail get all post reprot when is not admin" do
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_post_report
      end

      include_examples "should return the correct status code", 403
    end
  end

  describe "get get_comment_report" do
    let(:user_admin) {create :user, :admin}
    let(:user) {create :user}
    let(:post1) {create :post, :pending, :report_content, user_id: user.id}
    let!(:listComment) {create_list :post_comment, 10, :pending, :report_content, user_id: user.id, post_id: post1.id}
    context "success get all comment reprot" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_comment_report
      end

      it "get correct comments quantity" do
        data = JSON.parse(response.body)
        expect(data["comments"].length).to be 10
      end

      it "get correct comments" do
        data = JSON.parse(response.body)
        expect(data["comments"].map{ |comment| comment["id"]}.should =~ listComment.map{ |comment| comment["id"]}.reverse).to be true
      end

      include_examples "should return the correct status code", 200
    end

    context "success get all comment reprot when have page_size page_index" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :get_comment_report, params: {page_size: 5, page_index: 1}
      end

      it "get correct comments quantity" do
        data = JSON.parse(response.body)
        expect(data["comments"].length).to be 5
      end

      it "get correct posts" do
        data = JSON.parse(response.body)
        expect(data["comments"].map{ |comment| comment["id"]}.should =~ listComment.drop(5).map{ |comment| comment["id"]}.reverse).to be true
      end

      include_examples "should return the correct status code", 200
    end
  end

  describe "post change_post_report" do
    let(:user_admin) {create :user, :admin}
    let(:user) {create :user, :not_admin}
    let!(:post1) {create :post, :pending, :report_content, user_id: user.id}

    context "success change_post_report" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :change_post_report, params: {id: post1.id, status: 3}
      end

      it "status updated" do
        post1.reload
        expect(post1.status).equal? 3
      end

      include_examples "should return the correct status code", 200
    end

    context "fail change_post_report" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :change_post_report, params: {id: -1, status: 3}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "post change_comment_report" do
    let(:user_admin) {create :user, :admin}
    let(:user) {create :user}
    let(:post1) {create :post, :pending, :report_content, user_id: user.id}
    let!(:comment) {create :post_comment, :pending, :report_content, user_id: user.id, post_id: post1.id}
    context "success change_comment_report" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :change_comment_report, params: {id: comment.id, status: 3}
      end

      it "status updated" do
        comment.reload
        expect(comment.status).equal? 3
      end

      include_examples "should return the correct status code", 200
    end

    context "fail change_comment_report" do
      before do
        token_new = jwt_encode({user_id: user_admin.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :change_comment_report, params: {id: -1, status: 3}
      end

      it "status updated" do
        post1.reload
        expect(comment.status).equal? 2
      end

      include_examples "should return the correct status code", 400
    end
  end
end
