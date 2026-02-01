const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Roblox API Base URLs
const ROBLOX_USERS_API = 'https://users.roblox.com';
const ROBLOX_THUMBNAILS_API = 'https://thumbnails.roblox.com';
const ROBLOX_BADGES_API = 'https://badges.roblox.com';
const ROBLOX_GROUPS_API = 'https://groups.roblox.com';

// Helper function for API calls
async function fetchRobloxAPI(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Roblox API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API fetch error for ${url}:`, error.message);
    throw error;
  }
}

// API Routes

// Search users by keyword
app.get('/api/users/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.length < 2) {
      return res.json({ data: [] });
    }

    const data = await fetchRobloxAPI(
      `${ROBLOX_USERS_API}/v1/users/search?keyword=${encodeURIComponent(keyword)}&limit=5`
    );
    res.json(data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// Resolve username to user ID
app.post('/api/users/resolve', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    const data = await fetchRobloxAPI(`${ROBLOX_USERS_API}/v1/usernames/users`, {
      method: 'POST',
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true
      })
    });

    if (data.data && data.data.length > 0) {
      res.json(data.data[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Resolve error:', error);
    res.status(500).json({ error: 'Failed to resolve username' });
  }
});

// Get user profile
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await fetchRobloxAPI(`${ROBLOX_USERS_API}/v1/users/${userId}`);
    res.json(data);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get user avatar
app.get('/api/users/:userId/avatar', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await fetchRobloxAPI(
      `${ROBLOX_THUMBNAILS_API}/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`
    );

    if (data.data && data.data.length > 0) {
      res.json({ imageUrl: data.data[0].imageUrl });
    } else {
      res.json({ imageUrl: null });
    }
  } catch (error) {
    console.error('Avatar error:', error);
    res.json({ imageUrl: null });
  }
});

// Get user badges
app.get('/api/users/:userId/badges', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await fetchRobloxAPI(
      `${ROBLOX_BADGES_API}/v1/users/${userId}/badges?limit=100&sortOrder=Desc`
    );
    res.json(data);
  } catch (error) {
    console.error('Badges error:', error);
    res.json({ data: [] });
  }
});

// Get user groups
app.get('/api/users/:userId/groups', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await fetchRobloxAPI(
      `${ROBLOX_GROUPS_API}/v1/users/${userId}/groups/roles`
    );
    res.json(data);
  } catch (error) {
    console.error('Groups error:', error);
    res.json({ data: [] });
  }
});

// Full analysis endpoint (combines all data)
app.get('/api/analyze/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all data in parallel
    const [profile, avatar, badges, groups] = await Promise.all([
      fetchRobloxAPI(`${ROBLOX_USERS_API}/v1/users/${userId}`).catch(() => null),
      fetchRobloxAPI(`${ROBLOX_THUMBNAILS_API}/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`).catch(() => ({ data: [] })),
      fetchRobloxAPI(`${ROBLOX_BADGES_API}/v1/users/${userId}/badges?limit=100&sortOrder=Desc`).catch(() => ({ data: [] })),
      fetchRobloxAPI(`${ROBLOX_GROUPS_API}/v1/users/${userId}/groups/roles`).catch(() => ({ data: [] }))
    ]);

    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      profile,
      avatarUrl: avatar.data?.[0]?.imageUrl || null,
      badges: badges.data || [],
      groups: groups.data || []
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze user' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
