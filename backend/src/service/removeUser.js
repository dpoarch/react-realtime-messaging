const removeUser = (userID, conversation) => {
    return conversation.filter((user) => user.id != userID);
}

module.exports = removeUser;