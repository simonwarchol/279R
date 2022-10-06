[Tier 1] Programming HW5: Make a To-Do App with Flask

## Simon Warchol

**Note:** This submission follows the following tutorial: https://www.python-engineer.com/posts/flask-todo-app/

### How to Run

1) Install python and virtualenv. This guide is good https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
2) Create and activate the env:`python3 -m venv venv` and `. venv/bin/activate` (Mac/Unix) or `venv\Scripts\activate` (Windows)
3) Install dependencies: `pip install Flask Flask-SQLAlchemy`
4) Run the app: `python app.py`
5) Navigate to `http://127.0.0.1:5000`
### Reflection 
Reflection What are the significant software concepts that this combination of technologies has that each previous set of technologies did not? Or that they handle significantly differently?

The underlying concepts between Flask/SQL-lite and Node.js(express)/Mongo are relatively minor. 
Mongo is a NoSQL database, while SQL-lite is a relational database, so while Sql-lite requires a consistent schema and tabular row/column data-structure, Mongo is more flexible and allows for more complex data structures.
However, SQL-lite is a much more mature technology and benefits from decades of work in relational algebra/database systems for fast queries and consistent performance.
Both Flask and Express allow you to define routes and pass variables to some sort of templating engine (Jinja2 in Flask, EJS in Express).
The biggest benefit of Flask is that it is in python, which means that a flask app can easily
integrate with other python libraries (e.g. pandas, numpy, etc.). 
This is particularly useful when doing scientific computing / data science / machine learning.
Node and javascript, meanwhile, have a large ecosystem of front-end libraries and make it much easier to build a good-looking and functional UI.
I will note that many of those who were using Flask are transitioning to fastapi, which creates automatic
documentation and handles async requests much better than Flask.