class AddColumnTimeReport < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :time_report, :datetime, comment: "Thời gian người dùng báo cáo.", :default => nil
    add_column :posts, :time_report, :datetime, comment: "Thời gian người dùng báo cáo.", :default => nil
  end
end
