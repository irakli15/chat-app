export default class ConversationsClient {
    static retrieveConversations = async (userName, setConversations) => {
        if (userName) {
            const response = await fetch("http://localhost:8080/api/conversation/byUser/" + userName);
            const data = await response.json();
            setConversations(data);
            localStorage.setItem("currentUserName", userName);
        }
    };

    static retrieveFullConversation = async (conversationId, setConversationToShow) => {
        const response = await fetch("http://localhost:8080/api/conversation/getConversationById/" + conversationId)
        const data = await response.json();
        setConversationToShow(data);
    };

    static searchConversations = async (userName, setConversations, searchTerm) => {
        if (searchTerm && searchTerm.length > 0) {
            const response = await fetch("http://localhost:8080/api/conversation/searchConversations?" +
                new URLSearchParams({userName: userName, searchTerm: searchTerm}));
            const data = await response.json();
            setConversations(data);
            localStorage.setItem("currentUserName", userName);
        } else {
            await ConversationsClient.retrieveConversations(userName, setConversations);
        }
    };

    static sendMessage = async (sendMessageData,
                                conversationToShow,
                                setConversationToShow,
                                userName,
                                setConversations) => {
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

        const response = await fetch("http://localhost:8080/api/conversation/addMessage", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)

        });
        const conversationIdInResponse = await response.json();
        if (!conversationToShow.id) {
            await this.retrieveConversations(userName, setConversations);
        }
        let conversationId = conversationIdInResponse === null ? conversationToShow.id : conversationIdInResponse;
        console.log(conversationId);
        await ConversationsClient.retrieveFullConversation(conversationId, setConversationToShow);
    }

    static getCurrentUser = async (setUserName) => {
        const response = await fetch("http://localhost:8080/api/user/currentUser");
        const data = await response.json();
        setUserName(data.userName);
    }
}
