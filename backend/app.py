import os
from flask import Flask, jsonify
from flask_cors import CORS
from models import db

def create_app():
    app = Flask(__name__)

    # CORS Setup
    CORS(app, origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://student-sms-frontend-gaurri.onrender.com"
    ], supports_credentials=True)

    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'db.sqlite')}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Register Blueprints
    from routes.admin import admin_bp
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    @app.route("/")
    def home():
        return jsonify({"message": "Backend is running"})

    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
else:
    app = create_app()
