export const getUserNameByUserId = (userId, participants) => {
    return participants.filter(user => user.id === userId)[0].userName;
};
