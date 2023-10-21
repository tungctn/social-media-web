class CreateFriend < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.references :receiver, index: true, foreign_key: {to_table: :users}, comment: "Người NHẬN lời mời kết bạn"
      t.references :sender, index: true, foreign_key: {to_table: :users}, comment: "Người GỬI lời mời kết bạn"
      t.integer :friend_status, comment: "Trạng thái kết bạn: enum friend_status"
      t.integer :friend_type, comment: "Loại bạn bè: enum friend_type"
      t.timestamps
    end
  end
end
