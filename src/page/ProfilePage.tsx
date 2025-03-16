import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Edit, Instagram, User2, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RootState } from "@/store/store";
import {
  fadeIn,
  fadeUpItem,
  slideInLeft,
  slideInRight,
} from "@/lib/framer-animations";
import { Switch } from "@/components/ui/switch";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function ProfilePage() {
  const { profile, loading } = useSelector((state: RootState) => state.profile);

  const chartData = [
    { month: "January", engagement: 186 },
    { month: "February", engagement: 305 },
    { month: "March", engagement: 237 },
    { month: "April", engagement: 73 },
    { month: "May", engagement: 209 },
    { month: "June", engagement: 214 },
    { month: "July", engagement: 289 },
    { month: "August", engagement: 175 },
    { month: "September", engagement: 320 },
    { month: "October", engagement: 142 },
    { month: "November", engagement: 267 },
    { month: "December", engagement: 98 },
  ];
  const chartConfig = {
    engagement: {
      label: "Engagement",
      color: "#1aa0ff",
    },
  } satisfies ChartConfig;

  if (loading || !profile) {
    return (
      <div className="container flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="mb-8 flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div variants={slideInLeft} initial="hidden" animate="show">
          <Card>
            <CardHeader className="flex flex-col items-center p-6 text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.profile_pic} alt={profile.username} />
                <AvatarFallback>
                  <User2 className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-bold">{profile.username}</h2>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
              <div className="mt-4 flex space-x-4">
                <Link
                  to={profile.social_links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <Instagram className="mr-1 h-4 w-4" />
                  Instagram
                </Link>
                <Link
                  to={profile.social_links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <Youtube className="mr-1 h-4 w-4" />
                  YouTube
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">50K</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">120</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-xs text-muted-foreground">Campaigns</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          <Tabs defaultValue="campaigns">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">Past Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {profile.past_campaigns.map((campaign, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUpItem}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              {campaign.campaign_title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {campaign.brand}
                            </p>
                          </div>
                          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            {campaign.status}
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted p-3 text-center">
                            <div className="text-sm font-medium">
                              Engagement
                            </div>
                            <div className="text-lg font-bold">4.8%</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3 text-center">
                            <div className="text-sm font-medium">Reach</div>
                            <div className="text-lg font-bold">12.5K</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-medium">
                    Performance Overview
                  </h3>
                  <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={8}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar
                        dataKey="engagement"
                        fill="var(--color-engagement)"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-muted/60 p-4 text-center">
                      <div className="text-sm font-medium text-muted-foreground">
                        Avg. Engagement
                      </div>
                      <div className="text-2xl font-bold">5.2%</div>
                      <div className="text-xs text-green-500">
                        +0.8% from last month
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-4 text-center">
                      <div className="text-sm font-medium text-muted-foreground">
                        Total Reach
                      </div>
                      <div className="text-2xl font-bold">245K</div>
                      <div className="text-xs text-green-500">
                        +12% from last month
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-4 text-center">
                      <div className="text-sm font-medium text-muted-foreground">
                        Campaign Earnings
                      </div>
                      <div className="text-2xl font-bold">$3,250</div>
                      <div className="text-xs text-green-500">
                        +$750 from last month
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-medium">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Email Notifications
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            New campaign invitations
                          </span>
                          <Switch id="campaign-invitations" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Messages from brands</span>
                          <Switch id="messages-from-brands" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Community updates</span>
                          <Switch id="community-updates" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Privacy Settings
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Show my profile to brands
                          </span>
                          <Switch id="show-profile-to-brands" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            Allow brands to contact me
                          </span>
                          <Switch id="allow-brands-to-contact" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
