# -pc-wap-

- 判断当前访问的是PC还是wap


- 使用方法



	
		let ua = process.server ? req.headers['user-agent'] : navigator.userAgent
	
	    let bl = process.server
	      ? req.headers['accept-language']
	      : navigator.browserLanguage || navigator.language
	
	    let browser = new Browser(ua, bl)
	
	    browser.device === 'PC' 如果这里为true，为pc，反之为wap