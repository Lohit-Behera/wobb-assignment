"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CampaignCard } from "@/components/campaign-card";
import { CampaignFilter } from "@/components/campaign-filter";
import type { RootState } from "@/store/store";
import { fadeUpItem, staggerContainer } from "@/lib/framer-animations";

export default function HomePage() {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector(
    (state: RootState) => state.campaigns
  );

  // Simulate fetching campaigns
  useEffect(() => {
    // In a real app, you would fetch from an API
    // For now, we're using the data from Redux store
  }, [dispatch]);

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">
          Discover and apply to the latest influencer marketing campaigns
        </p>
      </motion.div>

      <CampaignFilter />

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {campaigns.map((campaign) => (
            <motion.div key={campaign.id} variants={fadeUpItem}>
              <CampaignCard campaign={campaign} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
