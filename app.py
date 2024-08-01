from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///attendance.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(10), nullable=False)  # 'student' or 'professor'
    lectures = db.relationship('Class', backref='professor', lazy=True)  # 추가된 필드

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    status = db.Column(db.String(10), nullable=False)

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    code = db.Column(db.String(10), nullable=False, unique=True)
    professor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # 추가된 필드

class ClassStudent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_code = db.Column(db.String(10), db.ForeignKey('class.code'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not name or not username or not password or not role:
        return jsonify({'message': 'Missing data'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(name=name, username=username, role=role)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        return jsonify({'success': True, 'role': user.role}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

@app.route('/students', methods=['GET'])
def get_students():
    students = User.query.filter_by(role='student').all()
    return jsonify([{'id': student.id, 'username': student.username} for student in students])

@app.route('/create_class', methods=['POST'])
def create_class():
    data = request.json
    name = data.get('name')
    code = data.get('code')
    professor_id = data.get('professor_id')

    # 요청 데이터를 출력하여 확인
    print("Received data:", data)

    if not name or not code or not professor_id:
        return jsonify({'message': 'Missing data'}), 400

    if Class.query.filter_by(code=code).first():
        return jsonify({'message': 'Class code already exists'}), 400

    new_class = Class(name=name, code=code, professor_id=professor_id)
    db.session.add(new_class)
    db.session.commit()
    return jsonify({'name': name, 'code': code}), 201

@app.route('/join_class', methods=['POST'])
def join_class():
    data = request.get_json()
    username = data['username']
    class_code = data['class_code']

    student = User.query.filter_by(username=username).first()
    class_ = Class.query.filter_by(code=class_code).first()

    if not student or not class_:
        return jsonify({'success': False, 'message': 'Invalid class code or username'}), 400

    new_class_student = ClassStudent(class_code=class_code, student_id=student.id)
    db.session.add(new_class_student)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Joined class successfully'})

@app.route('/class_students/<class_code>', methods=['GET'])
def get_class_students(class_code):
    class_students = ClassStudent.query.filter_by(class_code=class_code).all()
    students = [{'id': cs.student_id, 'username': User.query.get(cs.student_id).username} for cs in class_students]
    return jsonify(students)

@app.route('/user_info/<username>', methods=['GET'])
def get_user_info(username):
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_info = {
        'id': user.id,  # 여기에 ID 추가
        'name': user.name,
        'username': user.username,
        'role': user.role
    }
    return jsonify(user_info)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
