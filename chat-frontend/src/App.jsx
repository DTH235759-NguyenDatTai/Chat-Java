import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import "./App.css";

function App() {
    // State: du lieu ma component "nho". Doi state thi giao dien tu ve lai
    const [status, setStatus] = useState("Dang ket noi...");
    const [sender, setSender] = useState("");
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);

    // Ref: giu ket noi STOMP, doi gia tri nay KHONG ve lai giao dien
    const stompClientRef = useRef(null);
    // Ref tro toi cuoi khung chat, dung de cuon xuong tin moi nhat
    const messagesEndRef = useRef(null);

    // Chay mot lan khi component xuat hien: ket noi toi server
    useEffect(function () {
        const client = new Client({
            // Endpoint /ws da cau hinh o Step 2
            brokerURL: "ws://localhost:8080/ws"
        });

        // Chay khi ket noi thanh cong
        client.onConnect = function () {
            setStatus("Da ket noi");

            // Dang ky nghe kenh /topic/public
            client.subscribe("/topic/public", function (frame) {
                // frame.body la chuoi JSON, doi thanh object
                const message = JSON.parse(frame.body);

                // Them tin moi vao cuoi danh sach (tao mang moi, khong sua mang cu)
                setMessages(function (oldMessages) {
                    return [...oldMessages, message];
                });
            });
        };

        // Chay khi ket noi bi dong
        client.onWebSocketClose = function () {
            setStatus("Mat ket noi");
        };

        // Chay khi server tra loi loi STOMP
        client.onStompError = function (frame) {
            console.error("Loi STOMP: " + frame.headers["message"]);
        };

        client.activate();
        stompClientRef.current = client;

        // Ham don dep: chay khi component bi go bo, de dong ket noi
        return function () {
            client.deactivate();
        };
    }, []);

    // Moi khi danh sach tin nhan doi, cuon xuong cuoi
    useEffect(function () {
        if (messagesEndRef.current !== null) {
            messagesEndRef.current.scrollIntoView();
        }
    }, [messages]);

    // Gui tin nhan len server
    function sendMessage() {
        const trimmedSender = sender.trim();
        const trimmedContent = content.trim();

        if (trimmedSender === "") {
            alert("Vui long nhap ten cua ban");
            return;
        }

        if (trimmedContent === "") {
            return;
        }

        const client = stompClientRef.current;
        if (client === null || client.connected === false) {
            alert("Chua ket noi toi server");
            return;
        }

        const message = {
            sender: trimmedSender,
            content: trimmedContent
        };

        // Gui toi /app/chat.send, khop voi @MessageMapping("/chat.send") o Step 4
        client.publish({
            destination: "/app/chat.send",
            body: JSON.stringify(message)
        });

        // Xoa o nhap sau khi gui
        setContent("");
    }

    // Bam Enter trong o nhap tin nhan
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }

    // Giao dien (JSX)
    return (
        <div className="chat-box">
            <h1>Realtime Chat</h1>

            <p>Trang thai: {status}</p>

            <div className="row">
                <input
                    type="text"
                    placeholder="Ten cua ban"
                    value={sender}
                    onChange={function (event) {
                        setSender(event.target.value);
                    }}
                />
            </div>

            <div className="messages">
                {messages.map(function (message, index) {
                    return (
                        <div className="message" key={index}>
                            <span className="sender">{message.sender}: </span>
                            <span>{message.content}</span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef}></div>
            </div>

            <div className="row">
                <input
                    type="text"
                    placeholder="Nhap tin nhan..."
                    value={content}
                    onChange={function (event) {
                        setContent(event.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage}>Gui</button>
            </div>
        </div>
    );
}

export default App;