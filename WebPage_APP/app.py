from flask import (
    Flask,
    render_template)

app = Flask(__name__)

@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route('/templates/data/Geoschooldata.json')
def send_geo(path):
    return send_from_directory('templates', path)

@app.route('/templates/data/data2.csv')
def send_geo(path):
    return send_from_directory('templates', path)

if __name__ == '__main__':
    app.run(debug=True)