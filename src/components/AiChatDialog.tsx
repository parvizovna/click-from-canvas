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
import callPassengerMeme from "@/assets/call-passenger-meme.jpg";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
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

  const getWeatherInfo = async (): Promise<string> => {
    try {
      // Используем wttr.in API для получения погоды в Москве
      const response = await fetch('https://wttr.in/Moscow?format=j1&lang=ru');
      const data = await response.json();
      
      const current = data.current_condition[0];
      const temperature = current.temp_C;
      const feelsLike = current.FeelsLikeC;
      const description = current.lang_ru?.[0]?.value || current.weatherDesc[0].value;
      const humidity = current.humidity;
      const windSpeed = current.windspeedKmph;
      
      // Прогноз на ближайший час
      const hourly = data.weather[0].hourly[0];
      const nextHourTemp = hourly.tempC;
      const nextHourDesc = hourly.lang_ru?.[0]?.value || hourly.weatherDesc[0].value;
      
      return `Погода ближайший час:\n\n🌡️ Температура: ${nextHourTemp}°C (ощущается как ${feelsLike}°C)\n☁️ Состояние: ${nextHourDesc}\n💧 Влажность: ${humidity}%\n💨 Ветер: ${windSpeed} км/ч\n\nТекущая погода в Москве: ${temperature}°C, ${description}`;
    } catch (error) {
      console.error('Ошибка получения погоды:', error);
      return 'К сожалению, не удалось получить данные о погоде. Попробуйте позже.';
    }
  };

  const getRatingResponse = (question: string): string | null => {
    const lowerQuestion = question.toLowerCase();
    
    // Проверяем, относится ли вопрос к рейтингу
    const isRatingQuestion = 
      lowerQuestion.includes("рейтинг") ||
      lowerQuestion.includes("оценк") ||
      lowerQuestion.includes("звезд") ||
      lowerQuestion.includes("балл");
    
    if (!isRatingQuestion) return null;

    // Вопросы о текущем рейтинге пользователя
    if (
      lowerQuestion.includes("какой у меня") ||
      lowerQuestion.includes("мой рейтинг") ||
      lowerQuestion.includes("узнать рейтинг") ||
      lowerQuestion.includes("посмотреть рейтинг") ||
      lowerQuestion.includes("покажи рейтинг")
    ) {
      const randomRating = (Math.random() * (5.00 - 4.00) + 4.00).toFixed(2);
      return `Ваш текущий рейтинг: ${randomRating} ⭐\n\nЭто хороший показатель! Продолжайте в том же духе, чтобы поддерживать высокий уровень сервиса.`;
    }

    // Вопросы о том, что такое рейтинг и как он рассчитывается
    if (
      lowerQuestion.includes("что такое") ||
      lowerQuestion.includes("как рассчитыва") ||
      lowerQuestion.includes("как считается") ||
      lowerQuestion.includes("как формируется")
    ) {
      return "Рейтинг — это числовой показатель, который рассчитывается автоматически на основе оценок пассажиров после каждой поездки. Это объективный индикатор качества сервиса.\n\nСистема учитывает среднее арифметическое от всех полученных оценок за последние 500 поездок. Чем больше новых поездок, тем сильнее новые оценки влияют на общий рейтинг, «вытесняя» старые.";
    }

    // Вопросы о том, почему такой рейтинг
    if (
      lowerQuestion.includes("почему") ||
      lowerQuestion.includes("от чего зависит") ||
      lowerQuestion.includes("что влияет") ||
      lowerQuestion.includes("низкий") ||
      lowerQuestion.includes("упал") ||
      lowerQuestion.includes("снизился")
    ) {
      return "Ваш рейтинг формируется исключительно на основе оценок, которые ставят пассажиры после завершения поездки. Система учитывает последние 500 поездок.\n\nНа рейтинг влияют пять основных факторов:\n\n1. Корректность вождения: Плавность хода, соблюдение ПДД, отсутствие резких торможений и разгонов.\n\n2. Вежливость и коммуникация: Дружелюбное приветствие, уважительное общение, отсутствие конфликтов и навязчивых разговоров.\n\n3. Чистота и комфорт в салоне: Чистый автомобиль внутри и снаружи, приятный запах, отсутствие мусора.\n\n4. Соблюдение маршрута и точность: Следование построенному маршруту или пожеланиям пассажира, аккуратное и быстрое прибытие к точке подачи.\n\n5. Оперативность посадки/высадки: Минимальное время ожидания пассажира.\n\nЕсли рейтинг снизился, это означает, что в нескольких последних поездках один или несколько из этих критериев не были выполнены на высшем уровне.";
    }

    // Вопросы о том, как повысить рейтинг
    if (
      lowerQuestion.includes("как повысить") ||
      lowerQuestion.includes("как поднять") ||
      lowerQuestion.includes("как улучшить") ||
      lowerQuestion.includes("что сделать") ||
      lowerQuestion.includes("как увеличить")
    ) {
      return "Повысить рейтинг можно, последовательно получая высокие оценки от пассажиров. Новые оценки постепенно заменят старые, и рейтинг будет расти.\n\nЧек-лист рекомендаций:\n\n🚗 Контролируйте стиль вождения:\n- Избегайте резких маневров, торможений и ускорений\n- Соблюдайте скоростной режим и ПДД\n\n✨ Следите за чистотой автомобиля:\n- Ежедневно перед выходом на линию проводите уборку в салоне\n- Следите за чистотой стекол и кузова\n- Используйте нейтральные освежители воздуха\n\n👔 Соблюдайте стандарты сервиса:\n- Всегда приветствуйте пассажира\n- Предложите помощь с багажом\n- Уточните маршрут\n- Не ведите разговоры по телефону без необходимости\n- Избегайте обсуждения религии, политики и личной жизни\n\n⏱️ Будьте пунктуальны:\n- Подъезжайте к точке подачи максимально точно и быстро\n- Внимательно следите за окружающей обстановкой\n\n⚠️ Важно: Не просите пассажиров поставить оценку напрямую. Качественно выполненная поездка сама по себе является лучшим стимулом для получения высокой оценки.";
    }

    // Вопросы о том, кто поставил плохую оценку
    if (
      lowerQuestion.includes("кто поставил") ||
      lowerQuestion.includes("какой пассажир") ||
      lowerQuestion.includes("от кого") ||
      lowerQuestion.includes("кто дал")
    ) {
      return "Я не могу сообщить, кто именно поставил оценку, так как это персональные данные пассажира. Мы не можем выдать имя, телефон, адрес и другие данные про пользователя.\n\nСистема автоматическая и беспристрастная. Сосредоточьтесь на качестве каждой отдельной поездки — если делать свою работу хорошо, рейтинг обязательно вырастет.";
    }

    // Вопросы об изменении рейтинга вручную
    if (
      lowerQuestion.includes("изменить") ||
      lowerQuestion.includes("удалить оценку") ||
      lowerQuestion.includes("убрать оценку") ||
      lowerQuestion.includes("исправить")
    ) {
      return "Система автоматическая и беспристрастная. Мы не можем вручную изменить рейтинг или удалить конкретную низкую оценку.\n\nРейтинг не меняется от одной поездки. Для заметного роста нужно последовательно получать высокие оценки. Сосредоточьтесь на качестве каждой поездки — если делать свою работу хорошо, рейтинг обязательно вырастет сам собой.";
    }

    // Если вопрос о рейтинге, но не покрывается документом
    return "Я не могу ответить на вопрос";
  };

  const handleSend = async (message?: string) => {
    const textToSend = message || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Проверяем, это запрос позвонить пассажиру?
    if (textToSend === "Позвони пассажиру") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { 
            role: "assistant", 
            content: "Друг, я без стаканчика фильтра не выйду",
            image: callPassengerMeme
          },
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Проверяем, это вопрос о погоде?
    const isWeatherQuestion = 
      textToSend.toLowerCase().includes("погода") ||
      textToSend === "Какая погода будет в районе центра через час?";

    if (isWeatherQuestion) {
      const weatherInfo = await getWeatherInfo();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: weatherInfo },
      ]);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // Проверяем, это вопрос о рейтинге?
      const ratingResponse = getRatingResponse(textToSend);
      
      if (ratingResponse) {
        // Отвечаем на основе документа о рейтинге
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: ratingResponse },
        ]);
      } else {
        // Общие ответы для других вопросов
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
      }
      
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
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  {message.image && (
                    <img 
                      src={message.image} 
                      alt="Мем" 
                      className="mt-3 rounded-lg w-1/3 h-auto"
                    />
                  )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(question)}
                disabled={isLoading}
                className="text-xs h-auto py-2 whitespace-normal text-left justify-start"
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
