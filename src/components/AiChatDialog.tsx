import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AiChatDialog = ({ open, onOpenChange }: AiChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Здравствуйте! Я AI-помощник для водителей такси. Могу помочь с маршрутами, советами по работе, ответить на вопросы о заказах и многое другое. Чем могу помочь?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickQuestions = [
    "Покажи самые популярные точки для подачи в радиусе 5 км",
    "Какая погода будет в районе центра через час?",
    "Какие сегодня мероприятия в городе? (концерты, матчи)",
    "Позвони пассажиру",
  ];

  const handleSend = async (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Симуляция ответа AI
    setTimeout(() => {
      const responses = [
        "Отличный вопрос! Для оптимального маршрута рекомендую использовать объездные пути в часы пик.",
        "Согласно статистике, лучшее время для работы в вашем районе - с 7:00 до 10:00 и с 17:00 до 20:00.",
        "Постараюсь помочь! Могу проанализировать ваши последние поездки и дать рекомендации по улучшению заработка.",
        "Для экономии топлива рекомендую плавное ускорение и поддержание постоянной скорости. Это может сэкономить до 20% топлива.",
        "В вашем районе сейчас повышенный спрос. Рекомендую оставаться в радиусе центра города для получения большего количества заказов.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div>AI Помощник Водителя</div>
              <div className="text-sm font-normal text-muted-foreground">
                Всегда онлайн
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6" ref={scrollRef}>
          <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(question)}
                disabled={isLoading}
                className="text-xs h-8"
              >
                {question}
              </Button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Задайте вопрос помощнику..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
