
const db = require('../db');

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

exports.insertUserCard = async (uid, cardId, location = 0) => {

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
