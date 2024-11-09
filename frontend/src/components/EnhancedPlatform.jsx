import React, { useState } from 'react';
import { 
  Shield, Search, CheckCircle, AlertTriangle, 
  TrendingUp, User, ThumbsUp, Eye, Share2,
  BadgeCheck, AlertOctagon, Clock, BarChart2
} from 'lucide-react';

const EnhancedPlatform = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const newsItems = [
    {
      title: "New Research Shows Impact of Climate Change on Ocean Levels",
      source: "Environmental Science Journal",
      creator: "Dr. Sarah Johnson",
      creatorScore: 98,
      verificationStatus: "Verified",
      credibilityScore: 96,
      engagement: { views: "12.4K", shares: "3.2K", likes: "8.9K" },
      timestamp: "2 hours ago",
      category: "Science",
      badges: ["Expert", "Verified Source"]
    },
    {
      title: "AI Breakthrough in Medical Diagnosis",
      source: "Tech Health Weekly",
      creator: "James Chen",
      creatorScore: 94,
      verificationStatus: "Verified",
      credibilityScore: 92,
      engagement: { views: "8.2K", shares: "2.1K", likes: "5.4K" },
      timestamp: "4 hours ago",
      category: "Technology",
      badges: ["Tech Expert"]
    },
    {
      title: "Miracle Cure Found in Common Household Item",
      source: "Daily Health Blog",
      creator: "Health Tips Today",
      creatorScore: 45,
      verificationStatus: "False",
      credibilityScore: 12,
      engagement: { views: "25K", shares: "15K", likes: "18K" },
      timestamp: "1 hour ago",
      category: "Health",
      badges: []
    }
  ];

  const trendingTopics = [
    "Climate Science",
    "Medical Research",
    "Technology",
    "World News",
    "Economics"
  ];

  const topCreators = [
    { name: "Dr. Sarah Johnson", score: 98, verified: true, category: "Science" },
    { name: "James Chen", score: 94, verified: true, category: "Technology" },
    { name: "World News Network", score: 96, verified: true, category: "News" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">TruthLens</h1>
              <nav className="hidden md:flex space-x-4">
                {['trending', 'latest', 'verified', 'categories'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md ${
                      activeTab === tab 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for news or creators..."
                className="border rounded-md px-4 py-2 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* News Feed */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Trending News</h2>
            {newsItems.map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.timestamp}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      news.verificationStatus === "Verified" 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {news.verificationStatus === "Verified" ? (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <AlertOctagon className="h-4 w-4 mr-1" />
                          False
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-medium">{news.creator}</span>
                        {news.creatorScore >= 90 && (
                          <BadgeCheck className="h-5 w-5 text-blue-500 ml-1" />
                        )}
                      </div>
                      <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                        Score: {news.creatorScore}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {news.engagement.views}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        {news.engagement.shares}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {news.engagement.likes}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credibility Scores */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">Top Verified Creators</h3>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BadgeCheck className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-sm text-gray-500">{creator.category}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 text-green-700 px-2 py-1 rounded-md">
                      {creator.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">Trending Topics</h3>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span>{topic}</span>
                    <BarChart2 className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Alerts */}
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-yellow-600">Trending Misinformation Alert</h3>
                  <p className="text-sm text-yellow-600 mt-1">
                    Be aware of viral claims about miracle cures. Check our verification before sharing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPlatform;
