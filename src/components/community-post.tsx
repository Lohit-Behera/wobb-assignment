"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { fadeUpItem } from "@/lib/framer-animations";
import { type Post, addComment, likePost } from "@/store/store";
import { useDispatch } from "react-redux";

interface CommunityPostProps {
  post: Post;
}

export function CommunityPost({ post }: CommunityPostProps) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post.id));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(
        addComment({
          postId: post.id,
          comment: {
            username: "You",
            comment: comment.trim(),
          },
        })
      );
      setComment("");
    }
  };

  return (
    <motion.div variants={fadeUpItem}>
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.profile_pic} alt={post.username} />
              <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.username}</div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm">{post.post}</p>
        </CardContent>
        <CardFooter className="flex flex-col p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-muted-foreground"
                onClick={handleLike}
              >
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-muted-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments.length}</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-muted-foreground"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          {post.comments.length > 0 && (
            <div className="w-full border-t p-4">
              <h4 className="mb-2 text-sm font-medium">Comments</h4>
              <div className="space-y-3">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {comment.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 rounded-lg bg-secondary p-2 text-sm">
                      <span className="font-medium">{comment.username}</span>
                      <p className="text-xs">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Separator />
          <form
            onSubmit={handleAddComment}
            className="flex w-full items-center p-3"
          >
            <Avatar className="mr-2 h-7 w-7">
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-secondary"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              disabled={!comment.trim()}
              className="ml-2"
            >
              Post
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
