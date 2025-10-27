import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Все');

  const menuItems: MenuItem[] = [
    { id: 1, name: 'Классический бургер', description: 'Сочная говяжья котлета, свежие овощи', price: 450, category: 'Бургеры', image: 'https://cdn.poehali.dev/projects/40523410-3074-410e-ada5-0d924f5666f5/files/1dd07cbe-185c-43e7-8b72-9940fa6ce6f3.jpg' },
    { id: 2, name: 'Чизбургер', description: 'Двойной сыр, говядина, соус чеддер', price: 520, category: 'Бургеры', image: 'https://cdn.poehali.dev/projects/40523410-3074-410e-ada5-0d924f5666f5/files/1dd07cbe-185c-43e7-8b72-9940fa6ce6f3.jpg' },
    { id: 3, name: 'Картофель фри', description: 'Хрустящий картофель с солью', price: 180, category: 'Закуски', image: 'https://cdn.poehali.dev/projects/40523410-3074-410e-ada5-0d924f5666f5/files/6ac19ccf-92d1-46cf-8842-4fba9232eec9.jpg' },
    { id: 4, name: 'Наггетсы', description: '8 штук с соусом на выбор', price: 280, category: 'Закуски', image: 'https://cdn.poehali.dev/projects/40523410-3074-410e-ada5-0d924f5666f5/files/6ac19ccf-92d1-46cf-8842-4fba9232eec9.jpg' },
    { id: 5, name: 'Кока-кола', description: '0.5л холодный напиток', price: 120, category: 'Напитки', image: 'https://cdn.poehali.dev/projects/40523410-3074-410e-ada5-0d924f5666f5/files/6beeb245-a06c-4011-a862-21a631670497.jpg' },
    { id: 6, name: 'Милкшейк', description: 'Ванильный молочный коктейль', price: 250, category: 'Напитки', image: 'https://cdn.poehali.dev/projects/40523410-3074-410e-ada5-0d924f5666f5/files/6beeb245-a06c-4011-a862-21a631670497.jpg' },
  ];

  const categories = ['Все', 'Бургеры', 'Закуски', 'Напитки'];

  const filteredItems = activeCategory === 'Все' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">🍔</span>
            </div>
            <h1 className="text-2xl font-bold text-secondary">FastBite</h1>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <a href="#menu" className="text-foreground hover:text-primary transition-colors font-medium">Меню</a>
            <a href="#delivery" className="text-foreground hover:text-primary transition-colors font-medium">Доставка</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О нас</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">Контакты</a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-primary">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Итого:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary/10 via-accent/20 to-background py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-secondary">
              Быстро. Вкусно. <span className="text-primary">Свежо.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Доставка любимых бургеров и закусок за 30 минут или бесплатно
            </p>
            <Button size="lg" className="text-lg px-8">
              Смотреть меню
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">Наше меню</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <p className="text-2xl font-bold text-primary">{item.price} ₽</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full" onClick={() => addToCart(item)}>
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">30 минут</h3>
              <p className="text-muted-foreground">Или доставка бесплатно</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">По всему городу</h3>
              <p className="text-muted-foreground">Зона доставки 15 км</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Любой способ оплаты</h3>
              <p className="text-muted-foreground">Наличные или картой</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-secondary">О нас</h2>
            <p className="text-lg text-muted-foreground mb-4">
              FastBite — это современная сеть быстрого питания, где мы готовим только из свежих продуктов. 
              Наша миссия — делать качественную еду доступной каждому.
            </p>
            <p className="text-lg text-muted-foreground">
              Мы работаем с 2020 года и уже доставили более 100 000 заказов по всему городу.
            </p>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">Контакты</h2>
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="Phone" size={24} className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Телефон</h4>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Mail" size={24} className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">info@fastbite.ru</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={24} className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Адрес</h4>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={24} className="text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Режим работы</h4>
                  <p className="text-muted-foreground">Ежедневно с 10:00 до 23:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 FastBite. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;