class AddLabelAndErrorsToPostAndComment < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :label, :integer, comment: "Label của comment", :default => nil
    add_column :post_comments, :error_list, :json, comment: "Danh sách lỗi vi phạm comment", :default => nil
    add_column :posts, :label, :integer, comment: "Label của post ", :default => nil
    add_column :posts, :error_list, :json, comment: "Danh sách lỗi vi phạm post ", :default => nil
  end
end
