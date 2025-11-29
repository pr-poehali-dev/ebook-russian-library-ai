CREATE TABLE IF NOT EXISTS book_texts (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(200) NOT NULL,
    full_text TEXT NOT NULL,
    chapter_count INTEGER DEFAULT 1,
    word_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_book_texts_book_id ON book_texts(book_id);
CREATE INDEX idx_book_texts_author ON book_texts(author);

COMMENT ON TABLE book_texts IS 'Полные тексты произведений русской классической литературы';
COMMENT ON COLUMN book_texts.book_id IS 'ID книги из frontend списка';
COMMENT ON COLUMN book_texts.full_text IS 'Полный текст произведения';