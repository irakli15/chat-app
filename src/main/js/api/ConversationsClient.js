export default class ConversationsClient {
    static retrieveConversations = (userName, setConversations) => {
        if (userName) {
            fetch("http://localhost:8080/api/conversation/byUser/" + userName)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setConversations(data);
                    localStorage.setItem("currentUserName", userName);
                });
        }
    };

    static retrieveFullConversation = (conversationId, setConversationToShow) => {
        fetch("http://localhost:8080/api/conversation/getConversationById/" + conversationId)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setConversationToShow(data);
            });
    };

    static searchConversations = (userName, setConversations, searchTerm) => {
        if (searchTerm && searchTerm.length > 0) {
            fetch("http://localhost:8080/api/conversation/searchConversations?" +
                new URLSearchParams({userName: userName, searchTerm: searchTerm}))
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setConversations(data);
                    localStorage.setItem("currentUserName", userName);
                });
        } else {
            ConversationsClient.retrieveConversations(userName, setConversations);
        }
    };

    static sendMessage = (sendMessageData, conversationToShow, setConversationToShow, userName) => {
        const message = {
            id: null,
            content: sendMessageData.content,
            time: null,
            senderId: sendMessageData.conversation.participants.filter(user => user.userName === userName)[0].id,
            conversationId: sendMessageData.conversation.id
        }

        const dataToSend = {
            message: message,
            conversation: message.conversationId === null ? sendMessageData.conversation : null
        }

        fetch("http://localhost:8080/api/conversation/addMessage", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)

        })
            .then((response) => {
                fetch("http://localhost:8080/api/conversation/getConversationById/" + conversationToShow.id)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setConversationToShow(data);
                    });
            })
    }
}
