class AddColumnTypeReport < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :type_report, :integer, comment: "Loại báo cáo của người dùng.", :default => nil
    add_column :posts, :type_report, :integer, comment: "Loại báo cáo của người dùng.", :default => nil
  end
end
