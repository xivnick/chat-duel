
class KakaoResponse extends Object {

	constructor(version='2.0') {
		super();

		Object.assign(this, {
	        version: version,
	        template: {
	            outputs: [],
	        }
	    })
	}

	addSimpleText(text) {
		this.template.outputs.push({
			simpleText: {
				text
			}
		})
	}
}

module.exports = {
	KakaoResponse,
}