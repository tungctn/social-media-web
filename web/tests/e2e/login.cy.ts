describe("Login Test", () => {
  beforeEach(() => {
    // Xóa localStorage trước khi chạy mỗi test
    cy.clearLocalStorage();
  });

  it("should login successfully with correct credentials", () => {
    const email = "theanh962@gmail.com";
    const password = "anhtran96";

    cy.visit("/sign-in");

    // Nhập thông tin người dùng
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // Nhấn nút submit
    cy.get("form").submit();

    // Kiểm tra xem đã chuyển hướng đến trang chủ sau khi đăng nhập thành công
    cy.wait(2000);
    cy.url().should("include", "/");
    // Kiểm tra xem có thông báo chào mừng người dùng
    cy.contains("Welcom back! Have a good time!");

    // Kiểm tra xem có hiển thị tên người dùng
    cy.contains(email);
  });
});
