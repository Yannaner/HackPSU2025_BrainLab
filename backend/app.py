from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin
cred_path = os.path.join(os.path.dirname(__file__), os.getenv('FIREBASE_CREDENTIALS_PATH'))
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

#local arduino storage
arduino_data_storage = []

#Fire base auth
def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'No authorization header'}), 401
        
        try:
            # Extract the token
            token = auth_header.split('Bearer ')[1]
            # Verify the token
            decoded_token = auth.verify_id_token(token)
            # Add user info to request
            request.user = decoded_token
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': str(e)}), 401
            
    return decorated_function
#Authentication checking for the page
@app.route('/check-auth', methods=['POST'])
@require_auth
def check_auth():
    return jsonify({
        'user_id': request.user['uid'],
        'email': request.user.get('email', ''),
        'message': 'Authenticated successfully'
    })

@app.route('/process', methods=['POST'])
@require_auth
def process_file():
    data = request.json
    print("Received data:")
    print(f"Data content: {data['data']}")
    print(f"Type: {data['type']}")
    print(f"Name: {data['name']}")
    return jsonify({'result': 'Data received successfully'})

#Check the data input if its good
@app.route('/check', methods=['POST'])
@require_auth
def check_data():
    data = request.json
    print("Checking data:")
    print(f"Data content: {data['data']}")
    print(f"Type: {data['type']}")
    print(f"Name: {data['name']}")
    return jsonify({'result': 'Data validation successful'})


#arduino
@app.route('/send-arduino', methods=['GET'])
@require_auth
def send_arduino():
    # Arduino can request data from here
    return jsonify({'stored_data': arduino_data_storage})

@app.route('/response-arduino', methods=['POST'])
@require_auth
def response_arduino():
    # Arduino sends data back here
    data_from_arduino = request.json
    print("Arduino response:", data_from_arduino)
    return jsonify({'message': 'Arduino data received', 'arduino_data': data_from_arduino})





#Ngrok Testing method
@app.route('/testngrok', methods=['GET'])
def test_ngrok():
    return jsonify({'message': 'ngrok is working!'})

if __name__ == '__main__':
    app.run(debug=True)
