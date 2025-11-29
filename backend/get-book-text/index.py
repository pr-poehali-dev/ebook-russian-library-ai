import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получает полный текст произведения по ID книги
    Args: event - dict с httpMethod, queryStringParameters (book_id)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с текстом книги или ошибкой
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters') or {}
    book_id = params.get('book_id')
    
    if not book_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'book_id parameter is required'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration error'})
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    query = f"SELECT book_id, title, author, full_text, chapter_count, word_count FROM book_texts WHERE book_id = {book_id}"
    cursor.execute(query)
    
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if not row:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Book text not found', 'book_id': int(book_id)})
        }
    
    result = {
        'book_id': row[0],
        'title': row[1],
        'author': row[2],
        'full_text': row[3],
        'chapter_count': row[4],
        'word_count': row[5]
    }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps(result, ensure_ascii=False)
    }
