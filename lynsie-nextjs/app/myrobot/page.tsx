"use client"
import robot from './myrobot.module.css';
import {useEffect, useState} from "react";

const LLM_ADDRESS = "http://localhost:8000/lynsie/invoke";

const handleReadHistory = async () => {
    const response = await fetch('/myrobot/api/readHistory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();
    return result;
}

const handleWriteHistory = async (history, id) => {
    const data = {
        history: history, // replace this with the actual content
        id: id, // replace this with dynamic ID if needed
    };
    console.log(history + " " + id);

    const response = await fetch('/myrobot/api/writeHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result.res);
};


function HistoryList(setChatHistroy) {
    const [historyList, setHistoryList] = useState([]);

    const updateHistory = () => {
        handleReadHistory().then((data) => {
            setHistoryList(data.history);
        });
    };

    useEffect(() => {
        updateHistory();
    }, []);

    useEffect(() => {
        console.log(historyList);
    }, [historyList]);

    return (
        <div className={robot.sidebar}>
            <div className={robot.sidebarUser}>
                <div>
                    harry sun
                </div>
            </div>
            {historyList.map((item, index) => {
                return (item.id === "0" ? null :
                    <div
                        key={index}
                        className={robot.sidebarContent}
                    >
                        {item.id}
                    </div>
                );
            })}
            {/*<div className={robot.sidebarContent}>*/}
            {/*    123*/}
            {/*</div>*/}
        </div>
    )
}

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
        try{
            fetch(LLM_ADDRESS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "input": {
                        "human_input": inputText,
                    },
                    "config": {
                        "configurable": {
                            "session_id": "1"
                        }
                    },
                    "kwargs": {}
                })
            }).then((res) => res.json())
                .then((data) => {
                    setChatHistory((prevChatHistory) =>
                        JSON.stringify([
                            ...JSON.parse(prevChatHistory),
                            {Assistant: data.output},
                        ]));
                    setLoadingState(false);
                });
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
            console.error('Error config:', error.config);
        }

        setInputText('');
    };

    useEffect(() => {
        // 每次 chatHistory 或 loadingState 变化时都会触发
        if (loadingState !== null) { // 假设 loadingState 初始化为 null
            handleWriteHistory(chatHistory, loadingState ? 1 : 0);
        }
    }, [loadingState, chatHistory]);

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
            <HistoryList setChatHistroy={setChatHistory()}/>
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