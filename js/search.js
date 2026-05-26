/**
 * Search & filter
 */
const NexusSearch = (() => {
  function search(query, videos = NexusData.videos) {
    const q = (query || '').toLowerCase().trim();
    if (!q) return videos;
    return videos.filter((v) =>
      v.title.toLowerCase().includes(q) ||
      v.genre.toLowerCase().includes(q) ||
      v.creator.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)) ||
      v.description.toLowerCase().includes(q)
    );
  }

  function filter(videos, { genre, sort, year }) {
    let result = [...videos];
    if (genre) result = result.filter((v) => v.genre === genre);
    if (year) result = result.filter((v) => v.year >= parseInt(year, 10));
    if (sort === 'views') result.sort((a, b) => b.views - a.views);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') result.sort((a, b) => b.year - a.year);
    else if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }

  function initSearchPage() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const input = document.getElementById('searchInput');
    if (input) input.value = q;

    const run = () => {
      const query = input?.value || q;
      const genre = document.getElementById('filterGenre')?.value;
      const sort = document.getElementById('filterSort')?.value || 'views';
      let results = search(query);
      results = filter(results, { genre, sort });
      const count = document.getElementById('resultCount');
      if (count) count.textContent = `${results.length} results`;
      const grid = document.getElementById('searchResults');
      if (grid) grid.innerHTML = NexusApp.renderVideoGrid(results);
    };

    input?.addEventListener('input', debounce(run, 300));
    document.getElementById('filterGenre')?.addEventListener('change', run);
    document.getElementById('filterSort')?.addEventListener('change', run);
    run();
  }

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  return { search, filter, initSearchPage };
})();
