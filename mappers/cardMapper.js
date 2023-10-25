
const db = require('../db');

const selectCards = async () => {

	const sql = 'SELECT id, name, text, url FROM card';
	const values = [];

	try {
		const [ cards ] = await db.query(sql, values);

		return { cards };
	}
	catch (error) {
		console.log(error)

		return {cards: [], error}
	}
}

const selectCardById = async (id) => {

	const sql = 'SELECT id, name, text, url FROM card WHERE id = ?';
	const values = [id];

	try {
		const [[ card ]] = await db.query(sql, values);

		return { card };
	}
	catch (error) {
		console.log(error)

		return {card: null, error}
	}
}