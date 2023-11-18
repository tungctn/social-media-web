class AddLastTimeActiveToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :last_time_active, :datetime, comment: "Thời gian tương tác cuối cùng của người dùng.", :default => nil
  end
end
