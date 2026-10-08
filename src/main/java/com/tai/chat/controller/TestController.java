package com.tai.chat.controller;

import com.tai.chat.dto.ChatMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "Server dang chay!";
    }

    // Endpoint tam de kiem tra ChatMessage -> JSON
    @GetMapping("/api/test-message")
    public ChatMessage testMessage() {
        ChatMessage message = new ChatMessage("Tai", "Tran", "Xin chao");
        return message;
    }
}