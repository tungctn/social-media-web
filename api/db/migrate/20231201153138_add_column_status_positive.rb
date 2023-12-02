class AddColumnStatusPositive < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :status_positive, :integer, comment: "Trạng thái tích cực của comment.", :default => nil
  end
end
