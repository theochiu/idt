
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

			$("img#doof").after(content) 
		}
}

function get_pics(link, cookie) {
	// console.log("get_pics")

	const request = require("request")
	body = request(link, function(error, response, body) {

		// populate_textarea(body)
		extract_link(body)

		
	})

}

function extract_link(body) {
	// define regular expression
	let re = new RegExp('(?<=config_height":750[\\d\\D]+)https:\/\/[\\S]+(?=","config_width)')
	console.log(re)
	body = String(body)
	matches = body.match(re)
	populate_textarea(matches)
	console.log(matches.length)
}




