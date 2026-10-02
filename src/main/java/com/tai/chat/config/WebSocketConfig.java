package com.tai.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

//báo cho Spring "class này chứa cấu hình, hãy đọc nó khi khởi động".
@Configuration
//bật tính năng WebSocket kèm STOMP và broker.
@EnableWebSocketMessageBroker
//implements WebSocketMessageBrokerConfigurer:
// class này "cam kết" cung cấp các method cấu hình mà Spring yêu cầu.
// @Override nghĩa là ta viết lại method đó theo ý mình.
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // Mở endpoint để client kết nối vào
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //addEndpoint("/ws"): client sẽ kết nối tới ws://localhost:8080/ws. Lưu ý chữ ws:// thay cho http://.
        //setAllowedOriginPatterns("*"): cho phép mọi trang web kết nối vào. Tạm dùng * để học cho tiện.
        // Khi deploy ở Phase 9, ta sẽ giới hạn lại cho an toàn.
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*");
    }

    // Cấu hình "bưu điện" (broker) và đường đi của tin nhắn
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Tin client gửi LÊN server phải bắt đầu bằng /app
        registry.setApplicationDestinationPrefixes("/app");

        // Tin server phát XUỐNG client nằm trong các kênh bắt đầu bằng /topic
        registry.enableSimpleBroker("/topic");
    }
}