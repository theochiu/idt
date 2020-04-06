
// import jquery
let $ = require('jquery')

// button handler function
$("#submit").on("click", () => {
	let link = $("#link").val()
	let cookie = $("#cookie").val()

	get_pics(link, cookie)
})

function populate_textarea(str) {
	if ($("textarea").length) {
			$("textarea").val(str)
		}

		else {
			let content = "<textarea readonly>"
			content += str
			content += "</textarea>"

			$("h3#here").after(content)
		}
}

function get_pics(link, cookie) {



	const request = require("request")

	var headers = {
		'Accept-Language': 'en-US,en;q=0.8',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'cookie': 'ig_did=0D0D268A-E867-4581-9D5B-D6328ADA6730; mid=XoojOAAEAAE0rS55CDaioNDq9ujz; fbm_124024574287414=base_domain=.instagram.com; rur=VLL; fbsr_124024574287414=IyCUVnuCm8toOS6yaEyksRt5QDTFeUMpnlTIJF8b8-g.eyJ1c2VyX2lkIjoiMTAwMDA4NDgyNDIzNDE1IiwiY29kZSI6IkFRQXBGZkozZWN1OXVub1VsUU9QUHp3b0EzdXNfUFBpdklKSkRRanNFOEZXMW1PcE5jWDBqT0hOVF9Mbnd2VzVOTWk3ZDA5MjRFN1FRRFBGV1JMZE00amdJaXcwdVNUOUVwSEhHRWN6SWV6M1htYTBMdDRVeEVrZzdld0hvSldQT1VfbEkyYktwdmNZSXFadjhrN2dfWE9KQ3pBM0tWZDBQNHZ4MkxvTl9CM0l4U3A1VGMtdVUtS3djUDdiVVpXY3lEaXBMUTYzZUV2OFFnRWRWbmkxVlExM3djY2EtZ21vaGMzNnZFZTJtTmROVWJVamEtbWF5VmhnTkxLYV9oM1kwSHRiSkdpbm5DRXRNaTAwcUozZmZTclFxbnJTdmxydG1aZG1mVV9TbVgtOElKcFFtVUo1cUI2a25ibUlxREZlZkloVmtMQmZ0S200bVRQWXAxOTFHQ0cxazlIenUtY245aHFvTVliaENOdDFRdyIsIm9hdXRoX3Rva2VuIjoiRUFBQnd6TGl4bmpZQkFOc0RySWpEbmtCblVGTlV3T1JYb2daQUMwcXNFUXZ3TkxCazZDaWFjaFpCRzZuS1NPTUhsZE4yUzRUZ1hNbHFlY2pSNmhiWkNZelZiNUlOM1ZnbFpBcnZaQVFzZ0JCRDVudUpqeFFQSzNLTHlzNmRGZ0NMaG1aQm15ZUJXNHZ2QjhDVVRHMVpCMW9veHB0clpCVXg0WkF6SHU4ekdZS05leDVua0Z2MGxYd05RIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE1ODYyMDY5MjV9; csrftoken=H3ettOFQIszImCTIJkz6FtFowsBswRls; shbid=13471; shbts=1586206925.4851577; ds_user_id=145087976; sessionid=145087976%3Av4m9JGPOrJV94O%3A27;',
		// 'Referer': 'http://www.wikipedia.org/',
		'Connection': 'keep-alive'
	}

	var options = {
		url: link,
		headers: headers
	};

	body = request(options, function(error, response, body) {

		populate_textarea(body)
		links = extract_link(body)
		let content = "";

		$("img").css("display", "none")

		if (links.length != 0) {
			if ($("p#error").length)
				$("p#error").css("display", "none")

			for (let i=0; i<links.length; i++) {
				content += "<img src=\"" + links[i] + "\" >\n"
			}

			$("h3#here").css("display", "block");
			$("h3#here").after(content)
		}

		else {
			if (!($("p#error").length)) {
				$("h3#here").css("display", "none");
				$("h3#here").after("<p id=\"error\">Error, no images found, is it a private account? Did you paste the cookie correcty?</p>")
			}
			else {
				$("h3#here").css("display", "none");
				$("p#error").css("display", "block")
			}

		}
		
	})

}

function extract_link(body) {
	// define regular expression
	let re = new RegExp(/(?<=config_height":[\d]+},{\"src\":\")https:\/\/[^\"]+(?=\")/g)

	body = String(body)
	
	let matches = [...body.matchAll(re)];

	links = []
	for (let i=0; i<matches.length; i++) {
		link = String(matches[i]).replace(/\\u0026/g, "&")
		links.push(link);

	}
	return [... new Set(links)]
}




