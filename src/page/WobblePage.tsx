import type React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityPost } from "@/components/community-post";
import { type Post, type RootState, addPost } from "@/store/store";
import { staggerContainer } from "@/lib/framer-animations";

export default function WobblePage() {
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.community);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        username: "You",
        profile_pic: "https://via.placeholder.com/50",
        post: newPost.trim(),
        likes: 0,
        comments: [],
      };
      dispatch(addPost(post));
      setNewPost("");
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
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Wobble</h1>
        <p className="text-muted-foreground">
          Connect with other influencers and share your experiences
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Card>
              <CardHeader className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">
                    Share something with the community
                  </div>
                </div>
              </CardHeader>
              <form onSubmit={handleAddPost}>
                <CardContent className="p-4 pt-0">
                  <Input
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="min-h-[80px] resize-none"
                  />
                </CardContent>
                <CardFooter className="flex justify-end p-4 pt-0">
                  <Button type="submit" disabled={!newPost.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {posts.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardHeader className="p-4">
                <h2 className="text-lg font-semibold">Community Highlights</h2>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Tabs defaultValue="trending">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                  <TabsContent value="trending" className="mt-4 space-y-4">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium">Top Hashtags</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                        >
                          #NikeAirMax
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                        >
                          #SummerCampaigns
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-xs"
                        >
                          #ContentCreator
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium">Active Discussions</p>
                      <div className="mt-2 space-y-2">
                        <div className="text-xs">
                          <p className="font-medium">Tips for Nike campaign?</p>
                          <p className="text-muted-foreground">
                            15 comments • 2 hours ago
                          </p>
                        </div>
                        <div className="text-xs">
                          <p className="font-medium">
                            Best camera for product shots
                          </p>
                          <p className="text-muted-foreground">
                            32 comments • 5 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="recent" className="mt-4 space-y-4">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium">New Members</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <span className="ml-2 text-xs">
                            JaneDoe joined 30 min ago
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              TS
                            </AvatarFallback>
                          </Avatar>
                          <span className="ml-2 text-xs">
                            TechSavvy joined 1 hour ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium">Recent Posts</p>
                      <div className="mt-2 space-y-2">
                        <div className="text-xs">
                          <p className="font-medium">
                            First time applying for a campaign
                          </p>
                          <p className="text-muted-foreground">
                            Posted 45 min ago
                          </p>
                        </div>
                        <div className="text-xs">
                          <p className="font-medium">
                            Looking for collaboration partners
                          </p>
                          <p className="text-muted-foreground">
                            Posted 1 hour ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
