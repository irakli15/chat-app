export const getUserNameByUserId = (userId, participants) => {
    return participants.filter(user => user.id === userId)[0].userName;
};

export const getParticipantUserName = (participants, currentUserName) => {
    return participants.filter(participant => participant.userName !== currentUserName);
}
