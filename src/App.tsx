import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./page/HomePage";
import WobblePage from "./page/WobblePage";
import MessagesPage from "./page/MessagesPage";
import ProfilePage from "./page/ProfilePage";
import HelpPage from "./page/HelpPage";
import CampaignDetailsPage from "./page/CampaignDetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/wobble" element={<WobblePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
