class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.text :url, :limit => 4294967295, comment: "đường dẫn tới ảnh"
      t.timestamps
    end
  end
end
