import { MapPin, Clock, DollarSign, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderCardProps {
  id: string;
  passengerName: string;
  pickup: string;
  destination: string;
  price: number;
  distance: string;
  time: string;
  status: "new" | "active" | "completed";
  onAccept?: () => void;
  onComplete?: () => void;
}

export const OrderCard = ({
  passengerName,
  pickup,
  destination,
  price,
  distance,
  time,
  status,
  onAccept,
  onComplete,
}: OrderCardProps) => {
  const statusColors = {
    new: "bg-primary text-primary-foreground",
    active: "bg-success text-success-foreground",
    completed: "bg-muted text-muted-foreground",
  };

  const statusLabels = {
    new: "Новый заказ",
    active: "В процессе",
    completed: "Завершен",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">{passengerName}</p>
              <p className="text-sm text-muted-foreground">{time}</p>
            </div>
          </div>
          <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Откуда</p>
              <p className="font-medium">{pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Куда</p>
              <p className="font-medium">{destination}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{price} ₽</span>
            </div>
          </div>

          {status === "new" && onAccept && (
            <Button onClick={onAccept} size="sm">
              Принять
            </Button>
          )}

          {status === "active" && onComplete && (
            <Button onClick={onComplete} size="sm" variant="outline">
              Завершить
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
