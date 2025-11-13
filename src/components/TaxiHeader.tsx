import { Menu, MessageSquare, User, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface TaxiHeaderProps {
  onAiChatOpen: () => void;
  onMapOpen: () => void;
  showMap: boolean;
}

export const TaxiHeader = ({ onAiChatOpen, onMapOpen, showMap }: TaxiHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center font-bold text-lg text-primary-foreground">
              T
            </div>
            <div>
              <div className="font-bold text-lg">TaxiDrive</div>
              <div className="text-xs text-muted-foreground">Водитель</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showMap ? "default" : "outline"}
            size="icon"
            onClick={onMapOpen}
          >
            <MapPin className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={onAiChatOpen}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse" />
          </Button>

          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" className="justify-start relative">
                  <Bell className="h-5 w-5 mr-2" />
                  Уведомления
                  <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" className="justify-start">
                  Главная
                </Button>
                <Button variant="ghost" className="justify-start">
                  Заказы
                </Button>
                <Button variant="ghost" className="justify-start">
                  История
                </Button>
                <Button variant="ghost" className="justify-start">
                  Профиль
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
