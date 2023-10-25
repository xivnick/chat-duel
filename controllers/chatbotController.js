
const { KakaoResponse } = require('../models/kakaoResponse');

const gameService = require('../services/gameService');
const userService = require('../services/userService');

exports.postChatbot = async (req, res, next) => {

	const uid = req.body.userRequest.user.id;
	const message = req.body.userRequest.utterance;

	console.log({uid, message});

	if( !(await userService.existUser(uid)) ) {
		await userService.createUser(uid);
		await gameService.resetGameOfUser(uid);
	}

	if(message == '게임 시작') {  }
	if(message == '랭킹 확인') {  }
	if(message == '새 게임') {
		await gameService.resetGameOfUser(uid);
	}

	const kakaoResponse = new KakaoResponse();
	kakaoResponse.addSimpleText('Hello World!');

	return res.json(kakaoResponse);
}