import dash
import dash_core_components as dcc 
import dash_html_components as html
import dash_bootstrap_components as dbc
import webbrowser

app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])


app.layout = html.Div([

	html.H1("Instagram Downloader"),

	html.Div([
		html.H6("link:"),
		dcc.Input(placeholder="https://instagram.com/p/...", type="text", width=50),
	]),

	html.Div([
		html.H6("cookie:"),
		dcc.Input(placeholder="cookie", type="text"),
	]),

	], style={'marginBottom': 50, 'marginTop': 25, 'marginLeft': 25})

if __name__ == '__main__':
	webbrowser.open("http://localhost:3000", new=0, autoraise=True)
	app.run_server(debug=True, port=3000)


