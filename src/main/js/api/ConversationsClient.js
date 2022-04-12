export default class ConversationsClient {
	static getAuthHeader = () => {
		return {"Authorization": "Bearer " + localStorage.getItem("jwtToken")};
	}

	static retrieveConversations = async (userName, setConversations) => {
		if (userName) {
			const response = await fetch("http://localhost:8080/api/conversation/getAll/",
				{headers: ConversationsClient.getAuthHeader()});
			const data = await response.json();
			setConversations(data);
			localStorage.setItem("currentUserName", userName);
		}
	};

	static retrieveFullConversation = async (conversationId, setConversationToShow) => {
		const response = await fetch("http://localhost:8080/api/conversation/getConversationById/" + conversationId,
			{headers: ConversationsClient.getAuthHeader()})
		const data = await response.json();
		setConversationToShow(data);
	};

	static searchConversations = async (userName, setConversations, searchTerm) => {
		if (userName && searchTerm && searchTerm.length > 0) {
			const response = await fetch("http://localhost:8080/api/conversation/searchConversations?" +
				new URLSearchParams({userName: userName, searchTerm: searchTerm}),
				{headers: ConversationsClient.getAuthHeader()});
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
								conversations,
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
			headers: {'Content-Type': 'application/json', ...ConversationsClient.getAuthHeader()},
			body: JSON.stringify(dataToSend)

		});
		const savedMessage = await response.json();

		if (savedMessage.conversationId === conversationToShow.id) {
			const messagesList = [...conversationToShow.messages, savedMessage];
			setConversationToShow({...conversationToShow, messages : messagesList});
			const updatedConversation = conversations.filter((conv) => conv.id === savedMessage.conversationId)[0];
			updatedConversation.lastMessage = savedMessage.content;
			updatedConversation.lastMessageTime = savedMessage.time;
			updatedConversation.lastMessageFrom = savedMessage.senderId;
			const updatedConversations = [updatedConversation, ...conversations.filter((conv) => conv.id !== savedMessage.conversationId)];
			setConversations(updatedConversations)
		} else {
			await ConversationsClient.retrieveFullConversation(savedMessage.conversationId, setConversationToShow);
			await this.retrieveConversations(userName, setConversations);
		}
	}

	static checkAuth = async (setUserName) => {
		const response = await fetch("http://localhost:8080/api/user/currentUser", {
			headers: ConversationsClient.getAuthHeader()
		})
		if (response.status === 401) {
			setUserName(null);
			localStorage.removeItem("currentUserName");
			localStorage.removeItem("jwtToken");
		}
	}
}
