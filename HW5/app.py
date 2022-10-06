# Using https://www.python-engineer.com/posts/flask-todo-app/
from flask import Flask, render_template, request, redirect, url_for
# SQL alchemy abstracts the database and its tables into classes
from flask_sqlalchemy import SQLAlchemy

# Create the application instance
app = Flask(__name__)
# This will be relative to where the app.py file is
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
#  we don't need the sqlalchemy event system https://stackoverflow.com/questions/33738467/how-do-i-know-if-i-can-disable-sqlalchemy-track-modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# this class will be a table in the database
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    complete = db.Column(db.Boolean)


# Main route
@app.route("/")
def home():
    # Pulls all the todos from the database
    todo_list = Todo.query.all()
    # Renders the template and passes the todos to it
    return render_template("base.html", todo_list=todo_list)


# This post request comes from the HTML form and will add a todo to the database
@app.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    # Create a new instance of TODO
    new_todo = Todo(title=title, complete=False)
    # Add it to the database
    db.session.add(new_todo)
    db.session.commit()
    # Redirect to the homepage so that the list redraws
    return redirect(url_for("home"))


# Get route to mark a task as complete or incomplete, this looks for an int in the url which is the ID
@app.route("/toggle_complete/<int:todo_id>")
def toggle_complete(todo_id):
    # There should be only one todo with this ID
    todo = Todo.query.filter_by(id=todo_id).first()
    todo.complete = not todo.complete
    db.session.commit()
    # Redirect to the homepage so that the list redraws
    return redirect(url_for("home"))

# Get route to delete a task from the list
@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    # There should be only one todo with this ID
    todo = Todo.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    # Redirect to the homepage so that the list redraws
    return redirect(url_for("home"))


# this will be called if the script is executed directly
if __name__ == "__main__":
    # Via https://stackoverflow.com/questions/34122949/working-outside-of-application-context-flask
    with app.app_context():
        db.create_all()
    app.run(debug=True)
