import { TaxiHeader } from "@/components/TaxiHeader";
import { HistoryOrderCard } from "@/components/HistoryOrderCard";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiChatDialog } from "@/components/AiChatDialog";
import { Clock } from "lucide-react";

// Московские адреса для генерации случайных заказов
const moscowAddresses = [
  "Красная площадь, 1",
  "Тверская улица, 10",
  "Арбат, 25",
  "Ленинский проспект, 50",
  "Кутузовский проспект, 15",
  "Проспект Мира, 100",
  "Метро Парк Победы",
  "Московский Кремль",
  "ТЦ Европейский",
  "Аэропорт Шереметьево",
  "Бизнес-центр Москва-Сити",
  "Метро Павелецкая",
  "Метро Комсомольская",
  "ВДНХ",
  "Парк Сокольники",
  "Стадион Лужники",
  "МГУ им. Ломоносова",
  "Останкинская телебашня",
  "Третьяковская галерея",
  "Большой театр",
];

const passengerNames = [
  "Иван Петров",
  "Мария Сидорова",
  "Алексей Иванов",
  "Елена Смирнова",
  "Дмитрий Козлов",
  "Анна Волкова",
  "Сергей Новиков",
  "Ольга Морозова",
  "Павел Лебедев",
  "Татьяна Соколова",
];

// Генерация случайного заказа
const generateRandomOrder = (index: number) => {
  const pickupIndex = Math.floor(Math.random() * moscowAddresses.length);
  let destinationIndex = Math.floor(Math.random() * moscowAddresses.length);
  // Убедимся, что точка А и Б разные
  while (destinationIndex === pickupIndex) {
    destinationIndex = Math.floor(Math.random() * moscowAddresses.length);
  }

  const price = Math.floor(Math.random() * 501) + 500; // От 500 до 1000
  const rating = Math.floor(Math.random() * 5) + 1; // От 1 до 5
  const passengerName = passengerNames[Math.floor(Math.random() * passengerNames.length)];

  // Генерируем случайную дату за последние 30 дней
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    id: `history-${index}`,
    passengerName,
    pickup: moscowAddresses[pickupIndex],
    destination: moscowAddresses[destinationIndex],
    price,
    rating,
    date: formattedDate,
  };
};

const HistoryPage = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const navigate = useNavigate();

  // Генерируем 5 случайных заказов один раз при монтировании
  const historyOrders = useMemo(
    () => Array.from({ length: 5 }, (_, i) => generateRandomOrder(i)),
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <TaxiHeader
        onAiChatOpen={() => setAiChatOpen(true)}
        onMapOpen={() => navigate("/")}
        showMap={false}
      />

      <main className="container py-6 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">История заказов</h1>
            <p className="text-muted-foreground mt-1">Завершенные поездки</p>
          </div>
        </div>

        {historyOrders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>История пуста</p>
            <p className="text-sm">Завершенные поездки появятся здесь</p>
          </div>
        ) : (
          <div className="space-y-4">
            {historyOrders.map((order) => (
              <HistoryOrderCard key={order.id} {...order} />
            ))}
          </div>
        )}
      </main>

      <AiChatDialog open={aiChatOpen} onOpenChange={setAiChatOpen} />
    </div>
  );
};

export default HistoryPage;

