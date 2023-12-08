require "rails_helper"
require "shared_examples"
require "json"
include JsonWebToken

RSpec.describe PostCommentsController, type: :controller do
  describe "POST create" do
    let(:user) {create :user}
    let(:post1) {create :post, user_id: user.id}
    context "success create a post" do
      let(:post_comments_params) {attributes_for :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_comments_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(PostComment.exists?(id: data["comment"]["id"])).to be true
      end
    end

    context "success create a post" do
      let(:post_comments_params) {attributes_for :post_comment, :with_images, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_comments_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(PostComment.exists?(id: data["comment"]["id"])).to be true
      end
    end

    context "success create a reply comment" do
      let(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      let(:post_comments_params) {attributes_for :post_comment, :comment_reply, user_id: user.id,
                                                  post_id: post1.id, comment_reply: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_comments_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(PostComment.exists?(id: data["comment"]["id"])).to be true
      end
    end

    context "success create a reply comment from a reply comment" do
      let(:post_comment1) {create :post_comment, user_id: user.id, post_id: post1.id}
      let(:post_comment2) {create :post_comment, :comment_reply, user_id: user.id,
                                  post_id: post1.id, comment_reply: post_comment1.id}
      let(:post_comments_params) {attributes_for :post_comment, :comment_reply, user_id: user.id,
                                                  post_id: post1.id, comment_reply: post_comment2.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_comments_params
      end

      include_examples "should return the correct status code", 200

      it "database has a new post" do
        data = JSON.parse(response.body)
        expect(PostComment.exists?(id: data["comment"]["id"])).to be true
      end
    end

    context "fail create a post when not found post id" do
      let(:post_comment_params) {attributes_for :post_comment, user_id: user.id, post_id: -1}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_comment_params
      end

      include_examples "should return the correct status code", 400
    end

    context "fail create a post when content nil" do
      let(:post_comment_params) {attributes_for :post_comment, user_id: user.id, post_id: post1.id, content: nil}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :create, params: post_comment_params
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "GET show" do
    let(:user) {create :user}
    let(:post1) {create :post, user_id: user.id}
    context "success show comment a post" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {post_id: post1.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "success show comment a post when have page_index and page_size" do
      let!(:post_comment) {create_list :post_comment, 10, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {post_id: post1.id, page_index: 1, page_size: 7}
      end

      it "get correct posts quantity" do
        data = JSON.parse(response.body)
        expect(data["comments"].length).to be 7
      end

      include_examples "should return the correct status code", 200
    end

    context "success show comment a post when have reacts post comment" do
      let!(:like) {create :react, :like}
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      let!(:reacts_post_comment) {create :reacts_post_comment, react: like, user_id: user.id, post_comment_id: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {post_id: post1.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "success show comment a post when have comment reply" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      let!(:post_comment_reply) {create :post_comment, :comment_reply, user_id: user.id,
                                        post_id: post1.id, comment_reply: post_comment.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {post_id: post1.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "success show comment a post when have comment reply which have comment reply" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      let!(:post_comment_reply) {create :post_comment, :comment_reply, user_id: user.id,
                                        post_id: post1.id, comment_reply: post_comment.id}
      let!(:post_comment_reply2) {create :post_comment, :comment_reply, user_id: user.id,
                                          post_id: post1.id, comment_reply: post_comment_reply.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {post_id: post1.id}
      end

      include_examples "should return the correct status code", 200
    end

    context "fail show comment a post when not found post_id" do
      let!(:post_comments) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        get :show, params: {post_id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "PUT update" do
    let(:user) {create :user}
    let(:post1) {create :post, user_id: user.id}
    context "success update comment a post when update content" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {id: post_comment.id, content: "Content updated"}
      end

      it "content updated" do
        post_comment.reload
        expect(post_comment.content).equal? "content updated"
      end

      include_examples "should return the correct status code", 200
    end

    context "success update comment a post when update image and content" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      let(:image) {create :image}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {id: post_comment.id, content: "content updated", image_ids: [image.id]}
      end

      it "content updated" do
        post_comment.reload
        expect(post_comment.content).equal? "content updated"
      end

      include_examples "should return the correct status code", 200
    end

    context "fail update comment a post when not found id" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {id: -1, content: "Content updated"}
      end

      include_examples "should return the correct status code", 400
    end

    context "fail update comment a post when not permission" do
      let(:user_other) {create :user}
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user_other.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {id: post_comment.id, content: "Content updated"}
      end

      it "content not updated" do
        old_content = post_comment.content
        post_comment.reload
        expect(post_comment.content).equal? old_content
      end

      include_examples "should return the correct status code", 403
    end

    context "fail update comment a post when have content is nil" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        put :update, params: {id: post_comment.id, content: nil}
      end

      it "content not updated" do
        old_content = post_comment.content
        post_comment.reload
        expect(post_comment.content).equal? old_content
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "DELETE destroy" do
    let(:user) {create :user}
    let(:post1) {create :post, user_id: user.id}
    context "success update comment a post when update content" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: { id: post_comment.id }
      end

      it "remove post from database" do
        expect { post_comment.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      include_examples "should return the correct status code", 200
    end

    context "fail update comment a post when not found id" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: { id: -1 }
      end

      include_examples "should return the correct status code", 400
    end

    context "fail update comment a post when not permission" do
      let!(:user_other) {create :user}
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user_other.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        delete :destroy, params: { id: post_comment.id }
      end

      it "should not delete the football pitch" do
        expect(PostComment.where(id: post_comment.id)).to exist
      end

      include_examples "should return the correct status code", 403
    end

    context "fail when destroy fail" do
      let!(:post_comment) {create :post_comment, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        allow_any_instance_of(PostComment).to receive(:destroy).and_return(false)
        delete :destroy, params: {id: post_comment.id}
      end

      it "should not delete the football pitch" do
        expect(PostComment.where(id: post_comment.id)).to exist
      end

      include_examples "should return the correct status code", 400
    end
  end

  describe "POST report" do
    let(:user) {create :user}
    let(:user_other) {create :user}
    let(:post1) {create :post, user_id: user.id}
    context "success report" do
      let!(:post_comment) {create :post_comment, :active, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :report, params: {type_report: 1, id: post_comment.id}
      end

      it "status updated" do
        post_comment.reload
        expect(post_comment.status).to be 2
      end

      it "type_report updated" do
        post_comment.reload
        expect(post_comment.type_report).to be 1
      end

      include_examples "should return the correct status code", 200
    end

    context "fail report when not found post" do
      let!(:post_comment) {create :post_comment, :active, user_id: user.id, post_id: post1.id}
      before do
        token_new = jwt_encode({user_id: user.id, exp: Time.now.to_i + 4 * 3600})
        request.headers["Authorization"] = "Bearer #{token_new}"
        post :report, params: {type_report: 1, id: -1}
      end

      include_examples "should return the correct status code", 400
    end
  end
end
