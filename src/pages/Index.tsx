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
  {
    id: 9,
    title: 'Капитанская дочка',
    author: 'Александр Пушкин',
    year: 1836,
    genre: 'Повесть',
    description: 'Историческая повесть о восстании Пугачёва и чести русского офицера',
    rating: 5,
  },
  {
    id: 10,
    title: 'Отцы и дети',
    author: 'Иван Тургенев',
    year: 1862,
    genre: 'Роман',
    description: 'Роман о конфликте поколений и нигилизме',
    rating: 5,
  },
  {
    id: 11,
    title: 'Горе от ума',
    author: 'Александр Грибоедов',
    year: 1825,
    genre: 'Комедия',
    description: 'Сатирическая комедия о московском обществе',
    rating: 5,
  },
  {
    id: 12,
    title: 'Ревизор',
    author: 'Николай Гоголь',
    year: 1836,
    genre: 'Комедия',
    description: 'Комедия о чиновничьей коррупции и самозванстве',
    rating: 5,
  },
  {
    id: 13,
    title: 'Обломов',
    author: 'Иван Гончаров',
    year: 1859,
    genre: 'Роман',
    description: 'Роман о русской лени и упадке дворянства',
    rating: 5,
  },
  {
    id: 14,
    title: 'Братья Карамазовы',
    author: 'Фёдор Достоевский',
    year: 1880,
    genre: 'Роман',
    description: 'Философский роман о вере, сомнениях и человеческой природе',
    rating: 5,
  },
  {
    id: 15,
    title: 'Герой нашего времени',
    author: 'Михаил Лермонтов',
    year: 1840,
    genre: 'Роман',
    description: 'Психологический роман о "лишнем человеке" и его судьбе',
    rating: 5,
  },
  {
    id: 16,
    title: 'Вишнёвый сад',
    author: 'Антон Чехов',
    year: 1904,
    genre: 'Пьеса',
    description: 'Драма о закате дворянской эпохи и продаже родового имения',
    rating: 5,
  },
  {
    id: 17,
    title: 'Записки охотника',
    author: 'Иван Тургенев',
    year: 1852,
    genre: 'Рассказы',
    description: 'Цикл рассказов о жизни русских крестьян',
    rating: 5,
  },
  {
    id: 18,
    title: 'Собачье сердце',
    author: 'Михаил Булгаков',
    year: 1925,
    genre: 'Повесть',
    description: 'Сатирическая повесть о последствиях научного эксперимента',
    rating: 5,
  },
  {
    id: 19,
    title: 'Дама с собачкой',
    author: 'Антон Чехов',
    year: 1899,
    genre: 'Рассказ',
    description: 'Рассказ о запретной любви и поиске счастья',
    rating: 5,
  },
  {
    id: 20,
    title: 'Что делать?',
    author: 'Николай Чернышевский',
    year: 1863,
    genre: 'Роман',
    description: 'Социально-политический роман о новых людях и идеалах',
    rating: 4,
  },
  {
    id: 21,
    title: 'Бесы',
    author: 'Фёдор Достоевский',
    year: 1872,
    genre: 'Роман',
    description: 'Роман о революционном движении и его последствиях',
    rating: 5,
  },
  {
    id: 22,
    title: 'Гроза',
    author: 'Александр Островский',
    year: 1859,
    genre: 'Пьеса',
    description: 'Драма о купеческих нравах и женской судьбе',
    rating: 5,
  },
  {
    id: 23,
    title: 'Воскресение',
    author: 'Лев Толстой',
    year: 1899,
    genre: 'Роман',
    description: 'Роман о духовном возрождении и социальной несправедливости',
    rating: 5,
  },
  {
    id: 24,
    title: 'Медный всадник',
    author: 'Александр Пушкин',
    year: 1833,
    genre: 'Поэма',
    description: 'Поэма о Петербургском наводнении и маленьком человеке',
    rating: 5,
  },
  {
    id: 25,
    title: 'Дворянское гнездо',
    author: 'Иван Тургенев',
    year: 1859,
    genre: 'Роман',
    description: 'Роман о любви и поиске смысла жизни в дворянской среде',
    rating: 5,
  },
  {
    id: 26,
    title: 'Чайка',
    author: 'Антон Чехов',
    year: 1896,
    genre: 'Пьеса',
    description: 'Драма о любви, искусстве и разочаровании',
    rating: 5,
  },
  {
    id: 27,
    title: 'Бедная Лиза',
    author: 'Николай Карамзин',
    year: 1792,
    genre: 'Повесть',
    description: 'Сентиментальная повесть о несчастной любви крестьянки',
    rating: 4,
  },
  {
    id: 28,
    title: 'Поднятая целина',
    author: 'Михаил Шолохов',
    year: 1960,
    genre: 'Роман',
    description: 'Роман о коллективизации на Дону',
    rating: 4,
  },
];

const genres = ['Все', 'Роман', 'Поэма', 'Роман в стихах', 'Роман-эпопея', 'Повесть', 'Комедия', 'Пьеса', 'Рассказы', 'Рассказ'];
const authors = [
  'Все авторы',
  'Александр Пушкин',
  'Александр Грибоедов',
  'Александр Островский',
  'Антон Чехов',
  'Иван Гончаров',
  'Иван Тургенев',
  'Лев Толстой',
  'Михаил Булгаков',
  'Михаил Лермонтов',
  'Михаил Шолохов',
  'Николай Гоголь',
  'Николай Карамзин',
  'Николай Чернышевский',
  'Фёдор Достоевский',
];

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