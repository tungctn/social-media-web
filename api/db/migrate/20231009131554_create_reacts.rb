class CreateReacts < ActiveRecord::Migration[7.0]
  def change
    create_table :reacts do |t|
      t.integer :type_react, comment: "Loại của react"
      t.timestamps
    end
  end
end
