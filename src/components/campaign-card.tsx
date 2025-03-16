import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { hoverScale } from "@/lib/framer-animations";
import type { Campaign } from "@/store/store";
import { ProgressiveBlur } from "./ui/progressive-blur";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  // Extract numbers from hiring progress string (e.g., "15/20 Influencers Hired")
  const progressMatch = campaign.hiring_progress.match(/(\d+)\/(\d+)/);
  const current = progressMatch ? Number.parseInt(progressMatch[1]) : 0;
  const total = progressMatch ? Number.parseInt(progressMatch[2]) : 0;
  const progressPercentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <motion.div
      variants={hoverScale}
      initial="initial"
      whileHover="hover"
      className="h-full"
    >
      <Link to={`/campaign/${campaign.id}`} className="block h-full">
        <Card className="relative py-0 h-full overflow-hidden transition-all hover:shadow-md">
          <div className="relative w-full overflow-hidden">
            <ProgressiveBlur
              className="pointer-events-none absolute bottom-0 left-0 h-[30%] w-full"
              blurIntensity={3}
            />
            <img
              src={campaign.image || "/placeholder.svg"}
              alt={campaign.campaign_title}
              className="w-full h-82 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-lg font-semibold text-white">
                {campaign.brand}
              </h3>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-start justify-between">
              <h4 className="font-medium">{campaign.campaign_title}</h4>
              <Badge
                variant={
                  campaign.payout_type === "Fixed Pay" ? "default" : "secondary"
                }
                className="ml-2"
              >
                {campaign.payout_type}
              </Badge>
            </div>
            <p className="mb-3 text-sm text-muted-foreground line-clamp-1">
              {campaign.description}
            </p>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>{campaign.hiring_progress}</span>
                <span>{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-4 jus">
            <div className="text-sm font-medium">{campaign.payout_amount}</div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
