class CreateJoinTableReactsPosts < ActiveRecord::Migration[7.0]
  def change
    create_join_table :reacts, :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.index :react_id
      t.index :post_id
    end
  end
end
