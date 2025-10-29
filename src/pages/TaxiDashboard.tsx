import { useState } from "react";
import { TaxiHeader } from "@/components/TaxiHeader";
import { StatsCard } from "@/components/StatsCard";
import { OrderCard } from "@/components/OrderCard";
import { AiChatDialog } from "@/components/AiChatDialog";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  Activity,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const TaxiDashboard = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const { toast } = useToast();
  const [orders, setOrders] = useState([
    {
      id: "1",
      passengerName: "Иван Петров",
      pickup: "ул. Ленина, 45",
      destination: "Аэропорт Шереметьево",
      price: 1250,
      distance: "28 км",
      time: "10:30",
      status: "new" as const,
    },
    {
      id: "2",
      passengerName: "Мария Сидорова",
      pickup: "Красная площадь",
      destination: "ТЦ Европейский",
      price: 650,
      distance: "12 км",
      time: "10:15",
      status: "active" as const,
    },
    {
      id: "3",
      passengerName: "Алексей Иванов",
      pickup: "Метро Павелецкая",
      destination: "Бизнес-центр Москва-Сити",
      price: 450,
      distance: "8 км",
      time: "09:45",
      status: "completed" as const,
    },
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "active" as const } : order
      )
    );
    toast({
      title: "Заказ принят",
      description: "Клиент получил уведомление о вашем прибытии",
    });
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "completed" as const } : order
      )
    );
    toast({
      title: "Поездка завершена",
      description: "Деньги зачислены на ваш счет",
    });
  };

  const newOrders = orders.filter((o) => o.status === "new");
  const activeOrders = orders.filter((o) => o.status === "active");
  const completedOrders = orders.filter((o) => o.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <TaxiHeader onAiChatOpen={() => setAiChatOpen(true)} />

      <main className="container py-6 px-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Сегодня заработано"
            value="4,850 ₽"
            icon={DollarSign}
            trend="up"
            trendValue="+12%"
          />
          <StatsCard
            title="Поездок"
            value={15}
            subtitle="за сегодня"
            icon={MapPin}
            trend="up"
            trendValue="+3"
          />
          <StatsCard
            title="Время в сети"
            value="6ч 45м"
            subtitle="из 8 часов"
            icon={Clock}
          />
          <StatsCard
            title="Рейтинг"
            value="4.9"
            subtitle="238 отзывов"
            icon={Star}
          />
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatsCard
            title="За неделю"
            value="28,450 ₽"
            subtitle="89 поездок"
            icon={TrendingUp}
            trend="up"
            trendValue="+8%"
          />
          <StatsCard
            title="Средний чек"
            value="850 ₽"
            subtitle="за поездку"
            icon={Activity}
          />
          <StatsCard
            title="Часы работы"
            value="42ч 15м"
            subtitle="за неделю"
            icon={Clock}
            trend="up"
            trendValue="+2ч"
          />
        </div>

        {/* Orders Tabs */}
        <Tabs defaultValue="new" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="new" className="relative">
              Новые
              {newOrders.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
                  {newOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            {newOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Нет новых заказов</p>
                <p className="text-sm">Ожидайте новых клиентов</p>
              </div>
            ) : (
              newOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  {...order}
                  onAccept={() => handleAcceptOrder(order.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Нет активных заказов</p>
                <p className="text-sm">Примите новый заказ чтобы начать</p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  {...order}
                  onComplete={() => handleCompleteOrder(order.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>История пуста</p>
                <p className="text-sm">Завершенные поездки появятся здесь</p>
              </div>
            ) : (
              completedOrders.map((order) => (
                <OrderCard key={order.id} {...order} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <AiChatDialog open={aiChatOpen} onOpenChange={setAiChatOpen} />
    </div>
  );
};

export default TaxiDashboard;
