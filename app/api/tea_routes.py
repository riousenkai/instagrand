from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

tea_routes = Blueprint('teas', __name__)

@tea_routes.route('/', methods=['GET'])
@cross_origin(origins=[])  # Disable CORS for this route
def teas():
    return { 'teas': [{ 'test': 1}, { 'test': 2 }] }
