
const db = require('../db');

exports.updateUser = async (uid, level, difficulty) => {
    let sql = 'UPDATE user SET ';
    let values = [];

    if (level !== undefined) {
        sql += 'level = ?, ';
        values.push(level);
    }

    if (difficulty !== undefined) {
        sql += 'difficulty = ?, ';
        values.push(difficulty);
    }
    
    sql = sql.slice(0, -2);
    
    sql += ' WHERE uid = ?';
    values.push(uid);

    try {
        const [result] = await db.query(sql, values);

        return {};
    } catch (error) {
        console.log(error);
        return {error};
    }
};

exports.updateUserDelta = async (uid, levelDelta = 0, difficultyDelta = 0) => {

	const sql = 'UPDATE user SET level = level + ?, difficulty = difficulty + ? WHERE uid = ?';
	const values = [levelDelta, difficultyDelta, uid];

	try {
		const [result] = await db.query(sql, values);
		
		return {};
	} catch (error) {
		console.log(error);
		return {error};
	}
};

exports.insertUser = async (uid) => {

    const sql = 'INSERT INTO user (uid) VALUES (?);';
    const values = [uid];

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

exports.selectUserByUid = async (uid) => {

    const sql = 'SELECT id, uid, level, difficulty FROM user WHERE uid = ?';
    const values = [uid];

    try {
        const [[ user ]] = await db.query(sql, values);

        return { user }
    }
    catch (error) {
        console.log(error);

        return {user: null, error}
    }
}