import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

// Campaign types
export interface Campaign {
  id: number;
  brand: string;
  campaign_title: string;
  payout_type: string;
  payout_amount: string;
  hiring_progress: string;
  image: string;
  description: string;
  requirements?: string[];
  application_deadline?: string;
}

// Community post types
export interface Comment {
  username: string;
  comment: string;
}

export interface Post {
  id: number;
  username: string;
  profile_pic: string;
  post: string;
  likes: number;
  comments: Comment[];
}

// Message types
export interface Message {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

// Profile types
export interface SocialLinks {
  instagram: string;
  youtube: string;
}

export interface PastCampaign {
  brand: string;
  campaign_title: string;
  status: string;
}

export interface Profile {
  username: string;
  profile_pic: string;
  bio: string;
  social_links: SocialLinks;
  past_campaigns: PastCampaign[];
}

// Help center types
export interface HelpItem {
  question: string;
  answer: string;
}

// State interfaces
interface CampaignsState {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  loading: boolean;
}

interface CommunityState {
  posts: Post[];
  loading: boolean;
}

interface MessagesState {
  messages: Message[];
  loading: boolean;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
}

interface HelpState {
  helpItems: HelpItem[];
  loading: boolean;
}

// Initial states
const initialCampaignsState: CampaignsState = {
  campaigns: [
    {
      id: 1,
      brand: "Nike",
      campaign_title: "Promote Nike Air Max",
      payout_type: "Fixed Pay",
      payout_amount: "$500",
      hiring_progress: "15/20 Influencers Hired",
      image: "/Nike Air Max.jpg",
      description:
        "Create engaging content showcasing Nike Air Max sneakers in your daily routine.",
      requirements: [
        "Minimum 10K Instagram followers",
        "Post 2 Instagram Reels showcasing the product",
        "Tag @nike and use hashtags #NikeAirMax #FeelTheComfort",
      ],
      application_deadline: "April 15, 2025",
    },
    {
      id: 2,
      brand: "Starbucks",
      campaign_title: "Starbucks Summer Drinks",
      payout_type: "Barter",
      payout_amount: "Free Beverages for 1 Month",
      hiring_progress: "10/15 Influencers Hired",
      image: "/Starbucks Summer Drinks.webp",
      description:
        "Showcase your favorite Starbucks summer drinks on Instagram.",
    },
  ],
  selectedCampaign: null,
  loading: false,
};

const initialCommunityState: CommunityState = {
  posts: [
    {
      id: 1,
      username: "Influencer123",
      profile_pic: "https://via.placeholder.com/50",
      post: "Excited to collaborate with Nike! Who else is on this campaign? #NikeAirMax",
      likes: 25,
      comments: [
        {
          username: "FitnessGuru",
          comment: "I'm in! Can't wait to get started.",
        },
      ],
    },
    {
      id: 2,
      username: "TravelBlogger",
      profile_pic: "https://via.placeholder.com/50",
      post: "Thinking of applying for the Starbucks campaign. Anyone done this before?",
      likes: 40,
      comments: [
        {
          username: "CoffeeLover",
          comment: "Yes! It was a great experience.",
        },
      ],
    },
  ],
  loading: false,
};

const initialMessagesState: MessagesState = {
  messages: [
    {
      id: 1,
      sender: "Nike Brand Manager",
      message: "Hey, we loved your application! Let's discuss next steps.",
      timestamp: "2025-03-16 14:30",
    },
    {
      id: 2,
      sender: "Starbucks Team",
      message: "Your content was amazing! We'd love to collaborate again.",
      timestamp: "2025-03-15 10:00",
    },
  ],
  loading: false,
};

const initialProfileState: ProfileState = {
  profile: {
    username: "Influencer123",
    profile_pic: "https://via.placeholder.com/100",
    bio: "Lifestyle & fitness influencer | 50K followers | Content creator",
    social_links: {
      instagram: "https://instagram.com/influencer123",
      youtube: "https://youtube.com/influencer123",
    },
    past_campaigns: [
      {
        brand: "Adidas",
        campaign_title: "Adidas Ultraboost Promo",
        status: "Completed",
      },
      {
        brand: "Samsung",
        campaign_title: "Galaxy S24 Review",
        status: "Completed",
      },
    ],
  },
  loading: false,
};

const initialHelpState: HelpState = {
  helpItems: [
    {
      question: "How do I apply for a campaign?",
      answer:
        "Go to the Campaigns page, select a campaign, and click on the 'Apply' button. Follow the instructions to submit your application.",
    },
    {
      question: "What types of payouts are available?",
      answer:
        "We offer Fixed Pay (monetary), Barter (free products/services), and Refunds (cashback on purchased items).",
    },
    {
      question: "How can I contact a brand?",
      answer:
        "Once you're accepted into a campaign, you can use the Messages section to communicate with the brand directly.",
    },
  ],
  loading: false,
};

// Slices
const campaignsSlice = createSlice({
  name: "campaigns",
  initialState: initialCampaignsState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.campaigns = action.payload;
    },
    setSelectedCampaign: (state, action: PayloadAction<Campaign | null>) => {
      state.selectedCampaign = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

const communitySlice = createSlice({
  name: "community",
  initialState: initialCommunityState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (
      state,
      action: PayloadAction<{ postId: number; comment: Comment }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
  },
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialMessagesState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.unshift(action.payload);
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

const helpSlice = createSlice({
  name: "help",
  initialState: initialHelpState,
  reducers: {
    setHelpItems: (state, action: PayloadAction<HelpItem[]>) => {
      state.helpItems = action.payload;
    },
  },
});

// Export actions
export const { setCampaigns, setSelectedCampaign, setLoading } =
  campaignsSlice.actions;
export const { setPosts, addPost, likePost, addComment } =
  communitySlice.actions;
export const { setMessages, addMessage } = messagesSlice.actions;
export const { setProfile } = profileSlice.actions;
export const { setHelpItems } = helpSlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    campaigns: campaignsSlice.reducer,
    community: communitySlice.reducer,
    messages: messagesSlice.reducer,
    profile: profileSlice.reducer,
    help: helpSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
