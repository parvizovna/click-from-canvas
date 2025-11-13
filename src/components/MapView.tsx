import { Camera, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import aiTaxiIcon from "@/assets/ai-taxi-icon.png";

interface MapViewProps {
  onAiChatOpen: () => void;
}

export const MapView = ({ onAiChatOpen }: MapViewProps) => {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Map Background - Purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900">
        {/* Map pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="map-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 10 50 Q 30 30, 50 50 T 90 50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none"/>
                <path d="M 50 10 Q 30 30, 50 50 T 50 90" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-pattern)" />
          </svg>
        </div>

        {/* Location markers */}
        <div className="absolute top-[20%] left-[30%] bg-white rounded-full p-2 shadow-lg">
          <Camera className="h-4 w-4 text-secondary" />
        </div>
        <div className="absolute top-[35%] left-[45%] bg-white rounded-full p-2 shadow-lg">
          <Camera className="h-4 w-4 text-secondary" />
        </div>
        <div className="absolute top-[25%] right-[20%] bg-white rounded-full p-2 shadow-lg">
          <Camera className="h-4 w-4 text-secondary" />
        </div>

        {/* Center navigation arrow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Navigation className="h-16 w-16 text-primary fill-primary drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
        {/* Online Status Button */}
        <Button className="bg-primary text-primary-foreground rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-primary-foreground rounded-full" />
            <span>на линии</span>
          </div>
        </Button>

        {/* Stats */}
        <div className="flex gap-2">
          <div className="bg-secondary text-secondary-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold shadow-lg">
            0
          </div>
          <div className="bg-white text-destructive rounded-full h-12 w-12 flex items-center justify-center font-bold border-4 border-destructive shadow-lg">
            20
          </div>
        </div>
      </div>

      {/* AI Assistant Button - Left corner above Info Panel */}
      <Button
        onClick={onAiChatOpen}
        size="icon"
        className="absolute bottom-[165px] left-4 h-16 w-16 rounded-full bg-secondary text-secondary-foreground shadow-2xl hover:bg-secondary/90 z-20 p-0 overflow-hidden animate-[pulse_6s_ease-in-out_infinite] hover:animate-none hover:scale-110 transition-all duration-300"
      >
        <img src={aiTaxiIcon} alt="AI Taxi Assistant" className="h-full w-full object-cover" />
      </Button>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-sm text-secondary-foreground p-2 space-y-1.5 rounded-t-2xl z-10">
        {/* Date */}
        <h3 className="text-base font-bold">Пятница, 8 ноября</h3>

        {/* Priority and Orders Cards */}
        <div className="grid grid-cols-2 gap-1.5">
          <Card className="bg-secondary border-2 border-destructive p-2 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-full p-1">
                  <div className="h-4 w-4 bg-primary-foreground rounded-sm" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Приоритет</div>
                  <div className="text-lg font-bold">-2</div>
                </div>
              </div>
              <div className="bg-destructive text-destructive-foreground rounded-full p-1">
                <span className="text-sm font-bold">!</span>
              </div>
            </div>
          </Card>

          <Card className="bg-secondary/50 border border-border/20 p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 rounded-lg p-1.5">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-white rounded" />
                  <div className="w-0.5 h-3 bg-white rounded mt-1" />
                  <div className="w-0.5 h-3.5 bg-white rounded mt-0.5" />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">О заказов</div>
                <div className="text-base font-bold">0 ₽</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Bonus Schedule */}
        <Card className="bg-secondary/50 border border-border/20 p-2 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-muted-foreground">Расписание бонусов</div>
              <div className="text-sm font-semibold">17:10 — 18:49</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">от 870 ₽</div>
              <div className="text-[10px] text-muted-foreground">за заказ</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
