
const userMapper = require('../mappers/userMapper');
const userCardMapper = require('../mappers/userCardMapper');

const resetGameOfUser = async (uid) => {

	const {error} = await userMapper.updateUser(uid, 1, 1);

	if(error) return { error }

	const {error: error2} = await userCardMapper.deleteUserCards(uid);

	if(error2) return { error: error2 }

	const cardData = [];
	for(let i = 0; i < 10; i++) {
		cardData.push({cardId: 1})
	}

	const {error: error3} = await userCardMapper.insertUserCards(uid, cardData);
	if(error3) return { error: error3 }

	return {}
}

module.exports = {
	resetGameOfUser,
}