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
		const conversationIdInResponse = await response.json();
		if (!conversationToShow.id) {
			await this.retrieveConversations(userName, setConversations);
		}
		let conversationId = conversationIdInResponse === null ? conversationToShow.id : conversationIdInResponse;
		await ConversationsClient.retrieveFullConversation(conversationId, setConversationToShow);
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
