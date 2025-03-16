import type React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Search, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MessageItem } from "@/components/message-item";
import { type Message, type RootState, addMessage } from "@/store/store";
import { staggerContainer } from "@/lib/framer-animations";

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const { messages, loading } = useSelector(
    (state: RootState) => state.messages
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: "You",
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(message));
      setNewMessage("");
    }
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with brands and manage your campaign collaborations
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {["Nike Brand Manager", "Starbucks Team"].map(
                  (sender, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 transition-colors hover:bg-muted/50 ${
                        index === 0 ? "bg-muted/50" : ""
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{sender}</div>
                        <div className="text-xs text-muted-foreground">
                          {index === 0
                            ? "Hey, we loved your application! Let's discuss next steps."
                            : "Your content was amazing! We'd love to collaborate again."}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {index === 0 ? "2h" : "1d"}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="flex h-full flex-col">
            <CardHeader className="border-b p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Nike Brand Manager</div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {messages
                    .filter(
                      (msg) =>
                        msg.sender === "Nike Brand Manager" ||
                        msg.sender === "You"
                    )
                    .map((message) => (
                      <MessageItem key={message.id} message={message} />
                    ))}
                </motion.div>
              )}
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
