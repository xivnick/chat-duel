
const userMapper = require('../mappers/userMapper');

const existUser = async (uid) => {

	const { user } = await userMapper.selectUserByUid(uid);

	return !!user;
}

const createUser = async (uid) => {

	const { error } = await userMapper.insertUser(uid);

	if(error) return { error };

	return {}
}


module.exports = {
	existUser,

	createUser,
}