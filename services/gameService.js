
const userMapper = require('../mappers/userMapper');
const userCardMapper = require('../mappers/userCardMapper');


const drawCards = async (uid, count=2) => {

	// get location counts
	const { deckCount } = await userCardMapper.selectUserDeckCount(uid);
	const { handCount } = await userCardMapper.selectUserHandCount(uid);

	// check hand limit
	if(handCount + count > 10) count = 10 - handCount;

	// if deck not enough
	if(deckCount < count) {

		// draw all deck
		const { count: count2 } = await userCardMapper.updateUserRandomCardsLocation(uid, deckCount);
		count -= count2;

		// shuffle deck
		const { count: count3 } = await userCardMapper.updateUserCardsLocaton(uid);
	}

	// if deck still not enough
	if(deckCount < count) count = deckCount;

	// no more draw needed
	if(count == 0) return {};

	// draw cards
	const { count: count4 } = await userCardMapper.updateUserRandomCardsLocation(uid, count);

	return {};
}


const resetGameOfUser = async (uid) => {

	const {error} = await userMapper.updateUser(uid, 1, 1, 1);

	if(error) return { error }

	const {error: error2} = await userCardMapper.deleteUserCards(uid);

	if(error2) return { error: error2 }

	const cardData = [];
	for(let i = 0; i < 10; i++) {
		cardData.push({cardId: 1})
	}

	const {error: error3} = await userCardMapper.insertUserCards(uid, cardData);
	if(error3) return { error: error3 }

	const {error: error4} = await drawCards(uid, 5);

	return {}
}

const getHandOfUser = async (uid) => {

	const { hand, error } = await userCardMapper.selectUserHand(uid);

	if(error) return { hand: [], error }

	return { hand }
}

const isUserSupportOnly = async (uid) => {

	const { user } = await userMapper.selectUserByUid(uid);

	return user.supportOnly;
}

module.exports = {
	resetGameOfUser,
	drawCards,
	getHandOfUser,
	isUserSupportOnly,
}