
from flask import *

app = Flask(__name__)

@app.route("/")
def home():
	return render_template("index.html")

@app.route("/background_process_test")
def button_test():
	link = request.args.get('link')
	cookie = request.args.get("cookie")
	print("button test successfull")
	print(link)
	print(cookie)


if __name__ == '__main__':
	app.run(debug=True, port=3000)
