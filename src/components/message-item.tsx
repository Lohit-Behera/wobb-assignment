import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { fadeUpItem } from "@/lib/framer-animations";
import type { Message } from "@/store/store";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  // Format timestamp to a more readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <motion.div variants={fadeUpItem}>
      <Card className="mb-4 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{message.sender}</h4>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
