
const { KakaoResponse } = require('../models/kakaoResponse');

exports.postChatbot = (req, res, next) => {

	const kakaoResponse = new KakaoResponse();
	kakaoResponse.addSimpleText('Hello World!');

	return res.json(kakaoResponse);
}