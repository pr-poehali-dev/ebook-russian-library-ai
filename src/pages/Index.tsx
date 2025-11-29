import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  rating: number;
}

const sampleBooks: Book[] = [
  {
    id: 1,
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    genre: 'Роман',
    description: 'Эпический роман о русском обществе в эпоху наполеоновских войн',
    rating: 5,
  },
  {
    id: 2,
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    year: 1866,
    genre: 'Роман',
    description: 'Психологический роман о моральных дилеммах и искуплении',
    rating: 5,
  },
  {
    id: 3,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    genre: 'Роман',
    description: 'Философская история о любви, свободе и вечных истинах',
    rating: 5,
  },
  {
    id: 4,
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    year: 1833,
    genre: 'Роман в стихах',
    description: 'История о любви и упущенных возможностях',
    rating: 5,
  },
  {
    id: 5,
    title: 'Анна Каренина',
    author: 'Лев Толстой',
    year: 1877,
    genre: 'Роман',
    description: 'Трагическая история любви и поиска смысла жизни',
    rating: 5,
  },
  {
    id: 6,
    title: 'Мёртвые души',
    author: 'Николай Гоголь',
    year: 1842,
    genre: 'Поэма',
    description: 'Сатирическое произведение о российской действительности',
    rating: 4,
  },
  {
    id: 7,
    title: 'Идиот',
    author: 'Фёдор Достоевский',
    year: 1869,
    genre: 'Роман',
    description: 'История о князе Мышкине и его столкновении с миром',
    rating: 5,
  },
  {
    id: 8,
    title: 'Тихий Дон',
    author: 'Михаил Шолохов',
    year: 1940,
    genre: 'Роман-эпопея',
    description: 'Эпопея о судьбе казачества в революцию и Гражданскую войну',
    rating: 5,
  },
];

const genres = ['Все', 'Роман', 'Поэма', 'Роман в стихах', 'Роман-эпопея'];
const authors = ['Все авторы', 'Лев Толстой', 'Фёдор Достоевский', 'Михаил Булгаков', 'Александр Пушкин', 'Николай Гоголь', 'Михаил Шолохов'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedAuthor, setSelectedAuthor] = useState('Все авторы');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = sampleBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || book.genre === selectedGenre;
    const matchesAuthor = selectedAuthor === 'Все авторы' || book.author === selectedAuthor;
    return matchesSearch && matchesGenre && matchesAuthor;
  });

  const favoriteBooks = sampleBooks.filter((book) => favorites.includes(book.id));

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const getRecommendations = () => {
    if (favorites.length === 0) return [];
    const favoriteGenres = favoriteBooks.map((b) => b.genre);
    return sampleBooks
      .filter((book) => !favorites.includes(book.id) && favoriteGenres.includes(book.genre))
      .slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Library" size={32} className="text-primary" />
              <h1 className="font-cormorant text-4xl font-bold text-primary">Библиотека</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="text-muted-foreground hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#authors" className="text-muted-foreground hover:text-primary transition-colors">
                Авторы
              </a>
              <a href="#genres" className="text-muted-foreground hover:text-primary transition-colors">
                Жанры
              </a>
              <a href="#favorites" className="text-muted-foreground hover:text-primary transition-colors">
                Избранное
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="font-cormorant text-5xl md:text-7xl font-bold text-primary mb-6">
            Добро пожаловать в цифровую библиотеку
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Тысячи произведений русской классической литературы в одном месте. Открывайте, читайте, сохраняйте любимые книги.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск произведений или авторов..."
              className="pl-12 h-14 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {recommendations.length > 0 && (
        <section className="py-12 bg-accent/20">
          <div className="container mx-auto px-4 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Sparkles" size={28} className="text-accent" />
              <h3 className="font-cormorant text-3xl font-bold">Рекомендации для вас</h3>
            </div>
            <p className="text-muted-foreground mb-6">На основе ваших избранных произведений</p>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary">{book.genre}</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(book.id)}
                      >
                        <Icon
                          name={favorites.includes(book.id) ? 'Heart' : 'Heart'}
                          size={20}
                          className={favorites.includes(book.id) ? 'fill-red-500 text-red-500' : ''}
                        />
                      </Button>
                    </div>
                    <CardTitle className="font-cormorant text-2xl">{book.title}</CardTitle>
                    <CardDescription className="text-base">{book.author} • {book.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                    <Button
                      className="w-full"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Icon name="BookOpen" size={18} className="mr-2" />
                      Читать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12" id="catalog">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="catalog" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="catalog">Каталог</TabsTrigger>
              <TabsTrigger value="authors">Авторы</TabsTrigger>
              <TabsTrigger value="favorites">
                Избранное {favorites.length > 0 && `(${favorites.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="catalog" className="animate-fade-in">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="Filter" size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Жанр:</span>
                </div>
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Card key={book.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary">{book.genre}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(book.id)}
                        >
                          <Icon
                            name={favorites.includes(book.id) ? 'Heart' : 'Heart'}
                            size={20}
                            className={favorites.includes(book.id) ? 'fill-red-500 text-red-500' : ''}
                          />
                        </Button>
                      </div>
                      <CardTitle className="font-cormorant text-2xl">{book.title}</CardTitle>
                      <CardDescription className="text-base">{book.author} • {book.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                      <Button
                        className="w-full"
                        onClick={() => setSelectedBook(book)}
                      >
                        <Icon name="BookOpen" size={18} className="mr-2" />
                        Читать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="authors" className="animate-fade-in" id="authors">
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={20} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Автор:</span>
                </div>
                {authors.map((author) => (
                  <Button
                    key={author}
                    variant={selectedAuthor === author ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAuthor(author)}
                  >
                    {author}
                  </Button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedAuthor === 'Все авторы' ? sampleBooks : sampleBooks.filter(b => b.author === selectedAuthor)).map((book) => (
                  <Card key={book.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary">{book.genre}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(book.id)}
                        >
                          <Icon
                            name={favorites.includes(book.id) ? 'Heart' : 'Heart'}
                            size={20}
                            className={favorites.includes(book.id) ? 'fill-red-500 text-red-500' : ''}
                          />
                        </Button>
                      </div>
                      <CardTitle className="font-cormorant text-2xl">{book.title}</CardTitle>
                      <CardDescription className="text-base">{book.author} • {book.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                      <Button
                        className="w-full"
                        onClick={() => setSelectedBook(book)}
                      >
                        <Icon name="BookOpen" size={18} className="mr-2" />
                        Читать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="animate-fade-in" id="favorites">
              {favoriteBooks.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-cormorant text-2xl font-bold mb-2">Избранное пустое</h3>
                  <p className="text-muted-foreground">Добавьте произведения, которые вам нравятся</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteBooks.map((book) => (
                    <Card key={book.id} className="hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary">{book.genre}</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(book.id)}
                          >
                            <Icon
                              name="Heart"
                              size={20}
                              className="fill-red-500 text-red-500"
                            />
                          </Button>
                        </div>
                        <CardTitle className="font-cormorant text-2xl">{book.title}</CardTitle>
                        <CardDescription className="text-base">{book.author} • {book.year}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{book.description}</p>
                        <Button
                          className="w-full"
                          onClick={() => setSelectedBook(book)}
                        >
                          <Icon name="BookOpen" size={18} className="mr-2" />
                          Читать
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {selectedBook && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="secondary" className="mb-2">{selectedBook.genre}</Badge>
                  <CardTitle className="font-cormorant text-3xl mb-2">{selectedBook.title}</CardTitle>
                  <CardDescription className="text-lg">{selectedBook.author} • {selectedBook.year}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedBook(null)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground mb-6">{selectedBook.description}</p>
                <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-primary">
                  <p className="font-merriweather text-lg leading-relaxed">
                    Здесь будет отображаться полный текст произведения "{selectedBook.title}". 
                    В следующей версии мы добавим интеграцию с ChatGPT для поиска и отображения текстов произведений.
                  </p>
                  <p className="font-merriweather text-lg leading-relaxed mt-4 text-muted-foreground italic">
                    ChatGPT сможет найти нужное произведение в базе данных и вывести его содержимое на экран,
                    сохраняя оригинальное форматирование и структуру текста.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="border-t border-border/40 py-8 mt-16 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Library" size={24} className="text-primary" />
            <span className="font-cormorant text-2xl font-bold text-primary">Библиотека</span>
          </div>
          <p>Русская классическая литература • Цифровая библиотека • 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
