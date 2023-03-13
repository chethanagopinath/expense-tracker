from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.app_context().push()

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://expenseuser:passwrd@localhost/expense_tracker"
db = SQLAlchemy(app)

#id, created_at, description, amount, category
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)
    description = db.Column(db.String, nullable=True)
    amount = db.Column(db.Float, nullable=True)
    category = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"Expense: {self.description} {self.amount} {self.category}"
    
    def __init__(self, description, amount, category):
        self.description = description
        self.amount = amount
        self.category = category

@app.route("/expenses", methods=["POST"])
def create_expense():
    description = request.json["description"]
    amount = request.json["amount"]
    category = request.json["category"]

    expense = Expense(description, amount, category)

    db.session.add(expense)
    db.session.commit()

    created_expense = {
        "description": expense.description,
        "amount": expense.amount,
        "category": expense.category
    }

    return created_expense


@app.route("/expenses", methods=["GET"])
def get_expenses():
    expenses = Expense.query.all()
    expenses_list = []

    for expense in expenses:
        retrieved_expense = {
            "id": expense.id,
            "created_at": expense.created_at,
            "description": expense.description,
            "amount": expense.amount,
            "category": expense.category
        }

        expenses_list.append(retrieved_expense)

    return expenses_list

# @app.route("/")
# def hello_world():
#     return "HELLO WORLD"

if __name__=="__main__":
    app.run(debug=True)