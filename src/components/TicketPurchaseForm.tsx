import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingCart, Plus, Minus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(100, "Имя слишком длинное"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Введите корректный номер телефона").max(18, "Номер телефона слишком длинный"),
});

interface TicketPurchaseFormProps {
  ticketPrice: number;
  eventName: string;
}

interface SavedTicket {
  eventName: string;
  quantity: number;
  totalPrice: number;
  timestamp: number;
}

export const TicketPurchaseForm = ({ ticketPrice, eventName }: TicketPurchaseFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("ticketFormData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      form.reset(parsed);
    }
  }, [form]);

  // Save form data to localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("ticketFormData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const totalPrice = quantity * ticketPrice;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + delta));
    setQuantity(newQuantity);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save purchase to localStorage
      const purchases: SavedTicket[] = JSON.parse(localStorage.getItem("ticketPurchases") || "[]");
      purchases.push({
        eventName,
        quantity,
        totalPrice,
        timestamp: Date.now(),
      });
      localStorage.setItem("ticketPurchases", JSON.stringify(purchases));

      toast({
        title: "Билеты успешно забронированы! 🎉",
        description: `${quantity} билет(ов) на сумму ${totalPrice.toLocaleString('ru-RU')} ₽. Мы отправили подтверждение на ${values.email}`,
      });

      // Reset form after successful purchase
      form.reset();
      setQuantity(1);
    } catch (error) {
      toast({
        title: "Ошибка при бронировании",
        description: "Пожалуйста, попробуйте еще раз",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Покупка билетов
        </CardTitle>
        <CardDescription>Заполните форму для бронирования билетов</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Иван Иванов" 
                      {...field}
                      disabled={isLoading}
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ivan@example.com" 
                      type="email"
                      {...field}
                      disabled={isLoading}
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="+7 (999) 123-45-67" 
                      type="tel"
                      {...field}
                      disabled={isLoading}
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>Количество билетов</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || isLoading}
                  className="transition-all hover:scale-110 active:scale-95"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold text-primary">{quantity}</div>
                  <div className="text-sm text-muted-foreground">билет(ов)</div>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10 || isLoading}
                  className="transition-all hover:scale-110 active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-lg">
                <span>Цена за билет:</span>
                <span className="font-semibold">{ticketPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-2xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg h-12 transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Обработка...
                </>
              ) : (
                "КУПИТЬ БИЛЕТЫ"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
