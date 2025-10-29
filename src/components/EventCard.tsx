import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  artist: string;
  date: string;
  venue: string;
  time: string;
  price: number;
  image?: string;
}

export const EventCard = ({ artist, date, venue, time, price, image }: EventCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
      <div className="relative h-64 bg-gradient-to-br from-primary to-accent overflow-hidden">
        {image ? (
          <img src={image} alt={artist} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
              {artist}
            </h2>
          </div>
        )}
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
          {price.toLocaleString('ru-RU')} ₽
        </Badge>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">{date}</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">{venue}</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">{time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
