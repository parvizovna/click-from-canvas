import { Header } from "@/components/Header";
import { EventCard } from "@/components/EventCard";
import { TicketPurchaseForm } from "@/components/TicketPurchaseForm";
import { useEffect, useState } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const eventData = {
    artist: "ОЛЬГА БУЗОВА",
    date: "21.03.2025",
    venue: "КРОКУС СИТИ ХОЛЛ",
    time: "19:00",
    price: 3000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="container py-8 md:py-12">
        <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Билеты на концерт
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Забронируйте билеты на лучшие события прямо сейчас
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="transition-all duration-500 delay-100">
              <EventCard {...eventData} />
            </div>

            <div className="transition-all duration-500 delay-200">
              <TicketPurchaseForm 
                ticketPrice={eventData.price}
                eventName={`${eventData.artist} - ${eventData.date}`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
