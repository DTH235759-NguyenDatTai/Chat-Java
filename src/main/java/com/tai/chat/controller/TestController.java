package com.tai.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//nhãn báo "class này nhận request từ bên ngoài và trả dữ liệu trực tiếp về"
@RestController
public class TestController {
    //khi có người truy cập đường dẫn /api/test bằng phương thức GET
    //(ví dụ gõ URL vào trình duyệt), Spring sẽ gọi method test() bên dưới.
    @GetMapping("api/test")
    public String test() {
        return "Server đang chạy";
    }
}
