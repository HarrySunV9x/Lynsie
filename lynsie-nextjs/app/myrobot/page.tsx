"use client"
import robot from './myrobot.module.css';
import {useState} from "react";

const LLM_ADDRESS = "http://localhost:8000/llama3/invoke";

export default function MyRobot() {
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState('');
    const [loadingState, setLoadingState] = useState(false);
    const sendMessage = () => {
        setLoadingState(true);
        setChatHistory(
            chatHistory === ""
                ? JSON.stringify([{Human: inputText}])
                : JSON.stringify([...JSON.parse(chatHistory), {Human: inputText}])
        );
        var chat_history = [["", ""]];
        if (chatHistory === "") {

        } else {
            const data = JSON.parse(chatHistory);
            chat_history = data.map(obj => [Object.keys(obj)[0], Object.values(obj)[0]]);
        }
        fetch(LLM_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "input": {
                    "chat_history": chat_history,
                    "question": inputText
                }
            })
        }).then((res) => res.json())
            .then((data) => {
                setChatHistory((prevChatHistory) =>
                    JSON.stringify([
                        ...JSON.parse(prevChatHistory),
                        {Assistant: data.output},
                    ])
                );
                setLoadingState(false);
            });
        setInputText('');
    };

    const generateChatHistory = () => {
        if (chatHistory == "") {
            return <div className={robot.mainContentText}>
                {loadingState ? <div className={robot.loadingAnimation}></div> : null}
            </div>
        }
        return (
            <div className={robot.mainContentText}>
                {JSON.parse(chatHistory).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={item.hasOwnProperty("Human") ? robot.mainContentTextUser : robot.mainContentTextRobot}
                        >
                            {Object.values(item)[0]}
                        </div>
                    );
                })}
                {loadingState ? <div className={robot.loadingAnimation}></div> : null}
            </div>
        )
    }

    return (
        <div className={robot.robotMain}>
            <div className={robot.sidebar}>
                <div className={robot.sidebarUser}>
                    <div>
                        harry sun
                    </div>
                </div>
                <div className={robot.sidebarContent}>
                    123
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
                <div className={robot.sidebarContent}>
                    456
                </div>
            </div>
            <div className={robot.mainContent}>
                {generateChatHistory()}
                <div className={robot.mainContentInput}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}