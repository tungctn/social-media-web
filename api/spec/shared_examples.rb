RSpec.shared_examples "should return the correct status code" do |status_code|
  it "return the correct status code" do
    expect(response).to have_http_status(status_code)
  end
end

RSpec.shared_examples "should return the correct message" do |message|
  it "should return the correct message" do
    expect_json(message: message)
  end
end
