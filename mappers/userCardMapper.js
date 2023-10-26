
const db = require('../db');
const constants = require('../constants');

exports.deleteUserCards = async (uid) => {

	const sql = 'DELETE from user_card WHERE uid = ?';
	const values = [uid];

	try {
		const [ result ] = await db.query(sql, values);

		return {}
	}
	catch (error) {
		console.log(error);

		return {error}
	}
}

exports.insertUserCard = async (uid, cardId, location = constants.LOCATION_DECK) => {

	const sql = 'INSERT INTO user_card (uid, card_id, location) VALUES (?, ?, ?)';
	const values = [uid, cardId, location];

	try {
		const [ result ] = await db.query(sql, values);

		if(result.affectedRows == 0) return {error : new Error('something wrong')};

		return {}
	}
	catch (error) {
		console.log(error);

		return {error}
	}
}

exports.insertUserCards = async (uid, cardData) => {

    let placeholders = cardData.map(() => '(?, ?, ?)').join(', ');

    let sql = `INSERT INTO user_card (uid, card_id, location) VALUES ${placeholders}`;
    let values = [];

    for (let card of cardData) {
        values.push(uid, card.cardId, card.location || 0);
    }

    try {
        const [result] = await db.query(sql, values);
        
        if(result.affectedRows == 0) return {error : new Error('something wrong')};

        return {};
    } catch (error) {
        console.log(error);

        return {error};
    }
};

exports.selectUserHand = async (uid) => {

	const sql = `
		SELECT c.id as cid, uc.id as ucid, name, text, url 
			FROM user_card as uc LEFT JOIN card as c 
				ON uc.card_id = c.id 
			WHERE uid = ? AND location = ? 
			ORDER BY date ASC
	`;
	const values = [uid, constants.LOCATION_HAND];

	try {
		const [ hand ] = await db.query(sql, values);

		return { hand };
	}
	catch (error) {
		console.log(error)

		return {hand: [], error}
	}
}

exports.selectUserDeckCount = async (uid) => {

	const sql = 'SELECT count(0) as deckCount FROM user_card WHERE uid=? AND location=?';
	const values = [uid, constants.LOCATION_DECK];

	try {
		const [[ deckCount ]] = await db.query(sql, values);

		return { deckCount };
	}
	catch (error) {
		console.log(error)

		return {deckCount: 0, error}
	}
}

exports.selectUserHandCount = async (uid) => {

	const sql = 'SELECT count(0) as deckCount FROM user_card WHERE uid=? AND location=?';
	const values = [uid, constants.LOCATION_HAND];

	try {
		const [[ deckCount ]] = await db.query(sql, values);

		return { deckCount };
	}
	catch (error) {
		console.log(error)

		return {deckCount: 0, error}
	}
}

exports.updateUserCardsLocaton = async(uid, location=constants.LOCATION_DISCARD, to=constants.LOCATION_DECK) => {

	const sql = 'UPDATE user_card SET location=? WHERE uid=? AND location = ?';
	const values = [to, uid, location];

	try {
		const [ result ] = await db.query(sql, values);

		return {count: result.affectedRows}
	}
	catch (error) {
		console.log(error);

		return {error}
	}
}

exports.updateUserRandomCardsLocation = async (uid, count=1, location=constants.LOCATION_DECK, to=constants.LOCATION_HAND) => {

	const sql = 'UPDATE user_card SET location = ? WHERE uid = ? AND location = ? ORDER BY RAND() LIMIT ?'
	const values = [to, uid, location, count];

	try {
		const [ result ] = await db.query(sql, values);

		return {count: result.affectedRows}
	}
	catch (error) {
		console.log(error);

		return {error}
	}
}


