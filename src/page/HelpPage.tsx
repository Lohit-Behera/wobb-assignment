import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { RootState } from "@/store/store";
import { fadeUpItem, staggerContainer } from "@/lib/framer-animations";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { helpItems, loading } = useSelector((state: RootState) => state.help);

  const filteredHelpItems = helpItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to your questions and learn how to make the most of Wobb
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="p-6">
              <h2 className="text-xl font-semibold">
                Frequently Asked Questions
              </h2>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              ) : (
                <Accordion
                  className="grid gap-4 w-full divide-y divide-zinc-200 dark:divide-zinc-700"
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  variants={{
                    expanded: {
                      opacity: 1,
                      scale: 1,
                    },
                    collapsed: {
                      opacity: 0,
                      scale: 0.7,
                    },
                  }}
                >
                  {filteredHelpItems.map((item, index) => (
                    <motion.div key={index} variants={fadeUpItem}>
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="w-full text-left text-zinc-950 dark:text-zinc-50">
                          <div className="flex items-center justify-between">
                            <div>{item.question}</div>
                            <ChevronDown className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-180 dark:text-zinc-50" />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              )}
              {filteredHelpItems.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try a different search term or browse the categories
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="sticky top-24">
            <CardHeader className="p-6">
              <h2 className="text-xl font-semibold">Help Categories</h2>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <Tabs defaultValue="getting-started">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="getting-started">
                    Getting Started
                  </TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                </TabsList>
                <TabsContent value="getting-started" className="mt-4 space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Account Setup</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="text-primary hover:underline">
                        Creating your profile
                      </li>
                      <li className="text-primary hover:underline">
                        Linking social accounts
                      </li>
                      <li className="text-primary hover:underline">
                        Setting up notifications
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Platform Navigation</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="text-primary hover:underline">
                        Dashboard overview
                      </li>
                      <li className="text-primary hover:underline">
                        Finding campaigns
                      </li>
                      <li className="text-primary hover:underline">
                        Using the Wobble community
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="campaigns" className="mt-4 space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Applying for Campaigns</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="text-primary hover:underline">
                        Application process
                      </li>
                      <li className="text-primary hover:underline">
                        Selection criteria
                      </li>
                      <li className="text-primary hover:underline">
                        Improving your chances
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="mb-2 font-medium">Campaign Management</h3>
                    <ul className="space-y-1 text-sm">
                      <li className="text-primary hover:underline">
                        Tracking deliverables
                      </li>
                      <li className="text-primary hover:underline">
                        Communicating with brands
                      </li>
                      <li className="text-primary hover:underline">
                        Getting paid
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-lg bg-primary/10 p-4">
                <h3 className="mb-2 font-medium">Need more help?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Can't find what you're looking for? Contact our support team.
                </p>
                <Button className="w-full">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
