/**
 * NexusStream - Demo Data Layer
 * Large realistic mock datasets for all platform features
 */
const NexusData = (() => {
  const SAMPLE_VIDEOS = [
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumb: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217', duration: 596 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumb: 'https://download.blender.org/ED/cover.jpg', duration: 653 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumb: 'https://picsum.photos/seed/vid3/640/360', duration: 15 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', thumb: 'https://picsum.photos/seed/vid4/640/360', duration: 15 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', thumb: 'https://picsum.photos/seed/vid5/640/360', duration: 60 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', thumb: 'https://picsum.photos/seed/vid6/640/360', duration: 15 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', thumb: 'https://picsum.photos/seed/vid7/640/360', duration: 15 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', thumb: 'https://download.blender.org/BS4a/Sintel/sintel_poster.jpg', duration: 888 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', thumb: 'https://picsum.photos/seed/vid9/640/360', duration: 30 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', thumb: 'https://download.blender.org/BS4a/TearsOfSteel/tears_poster.jpg', duration: 734 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', thumb: 'https://picsum.photos/seed/vid11/640/360', duration: 45 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', thumb: 'https://picsum.photos/seed/vid12/640/360', duration: 47 },
    { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', thumb: 'https://picsum.photos/seed/vid13/640/360', duration: 59 }
  ];

  const GENRES = ['Action', 'Sci-Fi', 'Documentary', 'Drama', 'Comedy', 'Thriller', 'Animation', 'Horror', 'Romance', 'Adventure', 'Mystery', 'Fantasy', 'Crime', 'Biography', 'Sports', 'Music', 'Nature', 'Tech', 'Gaming', 'Education'];
  const CREATORS = ['Studio Alpha', 'Neon Pictures', 'Quantum Films', 'Horizon Media', 'Pulse Studios', 'Echo Productions', 'Vertex Cinema', 'Aurora Labs', 'Cipher Studios', 'Nova Entertainment'];
  const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Hindi', 'Portuguese', 'Italian', 'Arabic', 'Chinese', 'Russian'];
  const ADJECTIVES = ['Epic', 'Hidden', 'Ultimate', 'Lost', 'Dark', 'Silent', 'Neon', 'Cosmic', 'Frozen', 'Rising', 'Broken', 'Eternal', 'Quantum', 'Shadow', 'Crystal', 'Burning', 'Infinite', 'Parallel', 'Ancient', 'Digital'];
  const NOUNS = ['Horizon', 'Legacy', 'Protocol', 'Echoes', 'Frontier', 'Odyssey', 'Paradox', 'Summit', 'Vortex', 'Chronicle', 'Empire', 'Requiem', 'Genesis', 'Nexus', 'Pulse', 'Storm', 'Mirage', 'Cipher', 'Aurora', 'Spectrum'];

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[rand(0, arr.length - 1)];
  const pad = (n) => String(n).padStart(2, '0');

  function formatDuration(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  }

  function formatViews(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return String(n);
  }

  function generateVideos(count = 320) {
    const videos = [];
    for (let i = 1; i <= count; i++) {
      const sample = SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length];
      const genre = pick(GENRES);
      const title = `${pick(ADJECTIVES)} ${pick(NOUNS)} ${rand(1, 99)}`;
      const duration = sample.duration + rand(-30, 120);
      videos.push({
        id: `vid-${i}`,
        title,
        description: `Experience ${title} — a ${genre.toLowerCase()} masterpiece with stunning visuals and immersive storytelling. Part of our premium catalog.`,
        genre,
        creator: pick(CREATORS),
        thumbnail: `https://picsum.photos/seed/nexus${i}/640/360`,
        poster: `https://picsum.photos/seed/poster${i}/1280/720`,
        videoUrl: sample.url,
        duration,
        durationFormatted: formatDuration(Math.max(60, duration)),
        views: rand(1200, 98500000),
        likes: rand(100, 2500000),
        rating: (3.2 + Math.random() * 1.8).toFixed(1),
        year: rand(2015, 2026),
        language: pick(LANGUAGES),
        tags: [genre, pick(GENRES), pick(GENRES)].filter((v, idx, a) => a.indexOf(v) === idx),
        featured: i <= 12,
        trending: i % 7 === 0,
        quality: pick(['4K', '1080p', '720p', 'HDR']),
        progress: i <= 40 ? rand(5, 92) : 0
      });
    }
    return videos;
  }

  function generatePlaylists(videos, count = 48) {
    const names = ['Weekend Binge', 'Sci-Fi Marathon', 'Documentary Deep Dive', 'Action Packed', 'Late Night Chill', 'Morning Motivation', 'Epic Adventures', 'Hidden Gems', 'Award Winners', 'Director\'s Cut', '4K Showcase', 'Indie Collection', 'Classic Cinema', 'New Releases', 'Top Rated', 'Quick Watches', 'Full Series', 'Behind the Scenes', 'Soundtrack Hits', 'Festival Picks'];
    return Array.from({ length: count }, (_, i) => {
      const size = rand(8, 24);
      const ids = [];
      while (ids.length < size) {
        const id = videos[rand(0, videos.length - 1)].id;
        if (!ids.includes(id)) ids.push(id);
      }
      return {
        id: `pl-${i + 1}`,
        name: `${pick(names)} ${i + 1}`,
        description: `Curated collection of ${size} premium titles.`,
        thumbnail: videos[rand(0, videos.length - 1)].thumbnail,
        videoIds: ids,
        count: ids.length,
        visibility: pick(['public', 'private', 'unlisted']),
        created: `2025-${pad(rand(1, 12))}-${pad(rand(1, 28))}`,
        plays: rand(500, 5000000)
      };
    });
  }

  function generateComments(videos, count = 280) {
    const texts = [
      'Absolutely stunning cinematography!',
      'Best thing I watched this week.',
      'The soundtrack gave me chills.',
      'Plot twist at 42:00 was insane.',
      'Rewatching for the fifth time.',
      'Underrated gem in the catalog.',
      'Audio mix is phenomenal in 4K.',
      'Can we get a sequel please?',
      'Perfect for a weekend binge.',
      'The pacing in act two was perfect.',
      'Visual effects team deserves awards.',
      'Subtitles sync was flawless.',
      'Added to my favorites immediately.',
      'Shared with my entire watch party.',
      'This aged incredibly well.'
    ];
    const users = ['Viewer_Alpha', 'StreamFan42', 'Cinephile_X', 'NightOwl_99', 'MediaBuff', 'PixelPilot', 'ReelWatcher', 'FrameSeeker', 'CodecKing', 'BitratePro'];
    return Array.from({ length: count }, (_, i) => ({
      id: `cmt-${i + 1}`,
      videoId: videos[i % videos.length].id,
      user: pick(users) + rand(10, 999),
      avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
      text: pick(texts),
      likes: rand(0, 15000),
      dislikes: rand(0, 200),
      rating: rand(3, 5),
      timestamp: `${rand(0, 23)}h ago`,
      replies: rand(0, 12)
    }));
  }

  function generateHistory(videos, count = 120) {
    return Array.from({ length: count }, (_, i) => {
      const v = videos[i % videos.length];
      return {
        id: `hist-${i + 1}`,
        videoId: v.id,
        watchedAt: new Date(Date.now() - rand(1, 90) * 86400000).toISOString(),
        progress: rand(10, 98),
        duration: v.duration,
        device: pick(['Desktop', 'Mobile', 'Tablet', 'Smart TV']),
        sessionMinutes: rand(5, 180)
      };
    });
  }

  function generateNotifications(count = 85) {
    const types = [
      { type: 'upload', icon: '📤', title: 'New upload available', msg: 'A new title was added to your subscribed channel.' },
      { type: 'playlist', icon: '📋', title: 'Playlist updated', msg: '3 new videos were added to Weekend Binge.' },
      { type: 'recommend', icon: '✨', title: 'Recommended for you', msg: 'Based on your watch history, you might enjoy this.' },
      { type: 'download', icon: '⬇️', title: 'Download complete', msg: 'Your offline copy is ready to watch.' },
      { type: 'comment', icon: '💬', title: 'New reply', msg: 'Someone replied to your review.' },
      { type: 'trending', icon: '🔥', title: 'Trending now', msg: 'This title is climbing the charts today.' }
    ];
    return Array.from({ length: count }, (_, i) => {
      const t = pick(types);
      return {
        id: `notif-${i + 1}`,
        ...t,
        read: i > 25,
        time: `${rand(1, 72)}h ago`,
        priority: pick(['low', 'medium', 'high'])
      };
    });
  }

  function generateDownloads(videos, count = 35) {
    return Array.from({ length: count }, (_, i) => {
      const v = videos[i % videos.length];
      return {
        id: `dl-${i + 1}`,
        videoId: v.id,
        title: v.title,
        size: `${(rand(200, 4500) / 100).toFixed(1)} GB`,
        progress: i < 5 ? rand(20, 95) : 100,
        status: i < 5 ? 'downloading' : 'completed',
        quality: pick(['4K', '1080p', '720p']),
        started: `${rand(1, 14)} days ago`
      };
    });
  }

  function generateAnalytics(videos) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      totalWatchHours: 2847,
      totalViews: 12450000,
      avgSession: 47,
      engagement: 78.4,
      watchTimeByMonth: months.map((m) => ({ month: m, hours: rand(120, 420) })),
      viewsByDay: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, views: rand(8000, 95000) })),
      categoryBreakdown: GENRES.slice(0, 8).map((g) => ({ name: g, value: rand(5, 28) })),
      topVideos: videos.sort((a, b) => b.views - a.views).slice(0, 15),
      deviceStats: [
        { name: 'Desktop', value: 42 },
        { name: 'Mobile', value: 35 },
        { name: 'Tablet', value: 12 },
        { name: 'Smart TV', value: 11 }
      ],
      playbackSpeed: [
        { speed: '0.5x', count: 2 },
        { speed: '1x', count: 68 },
        { speed: '1.25x', count: 15 },
        { speed: '1.5x', count: 10 },
        { speed: '2x', count: 5 }
      ],
      retention: Array.from({ length: 20 }, (_, i) => ({ segment: `${i * 5}%`, retention: 100 - i * rand(3, 6) }))
    };
  }

  function generateSubtitles() {
    return LANGUAGES.flatMap((lang, li) =>
      Array.from({ length: 4 }, (_, i) => ({
        id: `sub-${li}-${i}`,
        language: lang,
        label: `${lang} (${pick(['CC', 'SDH', 'Full', 'Forced'])})`,
        code: lang.slice(0, 2).toLowerCase() + i,
        default: li === 0 && i === 0
      }))
    );
  }

  const videos = generateVideos(320);
  const playlists = generatePlaylists(videos, 48);
  const comments = generateComments(videos, 280);
  const history = generateHistory(videos, 120);
  const notifications = generateNotifications(85);
  const downloads = generateDownloads(videos, 35);
  const analytics = generateAnalytics([...videos]);
  const subtitles = generateSubtitles();
  const categories = GENRES.map((g, i) => ({
    id: `cat-${i}`,
    name: g,
    count: videos.filter((v) => v.genre === g).length + rand(20, 80),
    thumbnail: `https://picsum.photos/seed/cat${i}/400/225`
  }));

  const featured = videos.filter((v) => v.featured);
  const trending = videos.filter((v) => v.trending).concat(videos.slice(0, 30));
  const recommendations = videos.slice(40, 140);

  return {
    videos,
    playlists,
    comments,
    history,
    notifications,
    downloads,
    analytics,
    subtitles,
    categories,
    featured,
    trending,
    recommendations,
    genres: GENRES,
    getVideo: (id) => videos.find((v) => v.id === id),
    formatDuration,
    formatViews
  };
})();
