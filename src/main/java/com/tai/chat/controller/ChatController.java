package com.tai.chat.controller;

import com.tai.chat.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    // Client gui toi /app/chat.send thi method nay chay
    @MessageMapping("/chat.send")
    // Gia tri tra ve se duoc phat toi tat ca client dang subscribe /topic/public
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage message) {
        // In ra console server de ta thay tin nhan da toi noi
        System.out.println("Nhan tin nhan tu " + message.getSender() + ": " + message.getContent());

        return message;
    }
}
