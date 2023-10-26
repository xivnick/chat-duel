
class KakaoResponse extends Object {

	constructor(version='2.0', outputs = [], quickReplies = []) {
		super();

		Object.assign(this, {
	        version,
	        template: {
	            outputs,
	            quickReplies,
	        }
	    })
	}

	addOutput(output) {
		this.template.outputs.push(output)
	}
	addQuickReply(quickReply) {
		this.template.quickReplies.push(quickReply)
	}

	addSimpleText(text) {
		this.template.outputs.push({
			simpleText: {
				text
			}
		})
	}
}

class SimpleText extends Object {

	constructor(text) {
		super();

		Object.assign(this, {
			simpleText: {
				text
			}
		})
	}
}

class Carousel extends Object {

	constructor(type='basicCard', items=[]) {
		super();

		Object.assign(this, {
			carousel: {
				type,
				items,
			}
		})
	}

	addItem(item) {
		this.carousel.items.push(item);
	}
}

class BasicCard extends Object {

	constructor(title, description, imageUrl, buttons=[]) {
		super();

		Object.assign(this, {
			title, description,
			thumbnail: { imageUrl },
			buttons,
		})
	}

	addButton(button) {
		this.buttons.push(button);
	}
}

class MessageButton extends Object	{

	constructor(label, messageText) {
		super();

		if(!messageText) messageText = label;

		Object.assign(this, {
			action: 'message', 
			label, messageText
		})
	}
}

module.exports = {
	KakaoResponse,
	SimpleText,
	Carousel,
	BasicCard,
	MessageButton,
}