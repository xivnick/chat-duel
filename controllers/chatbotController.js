
const constants = require('../constants');

const gameService = require('../services/gameService');
const userService = require('../services/userService');

const KR = require('../models/kakaoResponse');

const showHandOutput = async (uid) => {

	const { hand } = await gameService.getHandOfUser(uid);

	const carousel = new KR.Carousel();

	for(const card of hand) {

		const bc = new KR.BasicCard(card.name, card.text, constants.BASE_URL + card.url);

		bc.addButton(new KR.MessageButton('카드 사용하기', '사용 ' + card.name));
		bc.addButton(new KR.MessageButton('서포트 내리기', '서포트 ' + card.name));

		carousel.addItem(bc);
	}

	return carousel;
}

exports.postChatbot = async (req, res, next) => {

	const uid = req.body.userRequest.user.id;
	const message = req.body.userRequest.utterance;

	if( !(await userService.existUser(uid)) ) {
		await userService.createUser(uid);
		await gameService.resetGameOfUser(uid);
	}

	const kakaoResponse = new KR.KakaoResponse();

	if(message == '게임 시작') {
		const output = await showHandOutput(uid)
		kakaoResponse.addOutput(output)
	}
	if(message == '랭킹 확인') { 
		kakaoResponse.addOutput(new KR.SimpleText('랭킹이 없습니다.'));
	 }
	if(message == '새 게임') {
		await gameService.resetGameOfUser(uid);

		const output = await showHandOutput(uid)
		kakaoResponse.addOutput(output)
	}

	return res.json(kakaoResponse);
}
