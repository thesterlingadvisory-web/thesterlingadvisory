import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Capabilities from './pages/public/Capabilities';
import CapabilityDetail from './pages/public/CapabilityDetail';
import Industries from './pages/public/Industries';
import IndustryDetail from './pages/public/IndustryDetail';
import Insights from './pages/public/Insights';
import InsightDetail from './pages/public/InsightDetail';
import Resources from './pages/public/Resources';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import NotFound from './pages/public/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import HomepageBuilder from './pages/admin/HomepageBuilder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/capabilities/:slug" element={<CapabilityDetail />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="homepage-builder" element={<HomepageBuilder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
