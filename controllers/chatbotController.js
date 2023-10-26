
const constants = require('../constants');

const gameService = require('../services/gameService');
const userService = require('../services/userService');

const KR = require('../models/kakaoResponse');

const showHandOutput = async (uid) => {

	const { hand } = await gameService.getHandOfUser(uid);

	const carousel = new KR.Carousel();

	for(const card of hand) {

		const bc = new KR.BasicCard(card.name, card.text, constants.BASE_URL + card.url);

		if(!(await gameService.isUserSupportOnly(uid))) bc.addButton(new KR.MessageButton('카드 사용하기', '사용 ' + card.name));
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

	// custom menu
	if(message == '게임 시작') {
		kakaoResponse.addOutput(await showHandOutput(uid));
	}
	if(message == '게임 설명') {
		kakaoResponse.addOutput(new KR.SimpleText('게임 설명 서비스는 준비중입니다.'));
	}
	if(message == '더 보기') {
		kakaoResponse.addOutput(new KR.SimpleText('원하는 메뉴를 선택하세요.'));

		kakaoResponse.addQuickReply(new KR.MessageButton('새 게임'));
		kakaoResponse.addQuickReply(new KR.MessageButton('랭킹 보기'));
		kakaoResponse.addQuickReply(new KR.MessageButton('이름 설정'));
	}

	// extra menu
	if(message == '새 게임') {
		await gameService.resetGameOfUser(uid);
		kakaoResponse.addOutput(await showHandOutput(uid));
	}
	if(message == '랭킹 보기') { 
		kakaoResponse.addOutput(new KR.SimpleText('랭킹 서비스는 준비중입니다.'));
	}
	if(message == '이름 설정') { 
		kakaoResponse.addOutput(new KR.SimpleText('이름 설정 서비스는 준비중입니다.'));
	}

	// action
	if(message.startsWith('사용 ')) {
		if(await gameService.IsUserSupportOnly(uid)) {
			kakaoResponse.addOutput(new KR.SimpleText('서포트 카드를 내려주세요.'));
			kakaoResponse.addOutput(await showHandOutput(uid));
		}
		else {
			kakaoResponse.addOutput(new KR.SimpleText('사용 서비스는 준비중입니다.'));
		}
	}
	if(message.startsWith('서포트 ')) {
		kakaoResponse.addOutput(new KR.SimpleText('서포트 내리기 서비스는 준비중입니다.'));
	}

	return res.json(kakaoResponse);
}
