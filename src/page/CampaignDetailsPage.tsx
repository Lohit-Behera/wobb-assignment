import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { type RootState, setSelectedCampaign } from "@/store/store";
import { slideInLeft, slideInRight } from "@/lib/framer-animations";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { campaigns, selectedCampaign, loading } = useSelector(
    (state: RootState) => state.campaigns
  );

  useEffect(() => {
    if (id) {
      const campaignId = Number.parseInt(id as string);
      const campaign = campaigns.find((c) => c.id === campaignId);
      if (campaign) {
        dispatch(setSelectedCampaign(campaign));
      }
    }
  }, [id, campaigns, dispatch]);

  if (loading || !selectedCampaign) {
    return (
      <div className="container flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Extract numbers from hiring progress string (e.g., "15/20 Influencers Hired")
  const progressMatch = selectedCampaign.hiring_progress.match(/(\d+)\/(\d+)/);
  const current = progressMatch ? Number.parseInt(progressMatch[1]) : 0;
  const total = progressMatch ? Number.parseInt(progressMatch[2]) : 0;
  const progressPercentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="container py-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6 flex items-center text-sm font-medium text-muted-foreground cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to campaigns
      </motion.button>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          <div className="relative mb-6 w-full overflow-hidden rounded-lg h-full min-h-[35vh] max-h-[60vh]">
            <ProgressiveBlur
              className="pointer-events-none absolute bottom-0 left-0 h-[30%] w-full"
              blurIntensity={3}
            />
            <img
              src={selectedCampaign.image || "/placeholder.svg"}
              alt={selectedCampaign.campaign_title}
              className="w-full h-full  object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/40 to-transparent p-4 h-[30%]">
              <h1 className="absolute bottom-4 left-4 mb-2 text-xl md:text-3xl font-bold text-white">
                {selectedCampaign.campaign_title}
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex items-center">
              <Badge
                variant={
                  selectedCampaign.payout_type === "Fixed Pay"
                    ? "default"
                    : "secondary"
                }
              >
                {selectedCampaign.payout_type}
              </Badge>
              <span className="ml-4 text-sm text-muted-foreground">
                by{" "}
                <span className="font-medium text-foreground">
                  {selectedCampaign.brand}
                </span>
              </span>
            </div>
            <p className="text-muted-foreground">
              {selectedCampaign.description}
            </p>
          </div>

          {selectedCampaign.requirements && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Requirements</h2>
                <ul className="space-y-2">
                  {selectedCampaign.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" animate="show">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="mb-1 text-lg font-semibold">
                  {selectedCampaign.payout_amount}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCampaign.payout_type}
                </p>
              </div>

              <Separator className="mb-6" />

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Hiring Progress</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {selectedCampaign.hiring_progress}
                </p>
              </div>

              {selectedCampaign.application_deadline && (
                <div className="mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Application Deadline</span>
                  </div>
                  <p className="mt-1 font-medium">
                    {selectedCampaign.application_deadline}
                  </p>
                </div>
              )}

              <Button className="w-full">Apply Now</Button>

              <div className="mt-6">
                <h4 className="mb-3 text-sm font-medium">Campaign Manager</h4>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {selectedCampaign.brand.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="text-sm font-medium">
                      {selectedCampaign.brand} Team
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Typically responds within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
