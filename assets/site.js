(() => {
  const controls = document.getElementById('controls');
  if (!controls) return;
  const search = document.getElementById('search');
  const tag = document.getElementById('tag');
  const level = document.getElementById('level');
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');
  const rows = [...document.querySelectorAll('[data-row]')];
  controls.hidden = false;

  function filter() {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const row of rows) {
      const match =
        words.every((word) => row.dataset.search.includes(word)) &&
        (!tag.value || row.dataset.tags.split(' ').includes(tag.value)) &&
        (!level.value || row.dataset.levels.split(' ').includes(level.value));
      row.hidden = !match;
      if (match) shown++;
    }
    const filtered = words.length || tag.value || level.value;
    count.textContent = filtered
      ? `${shown} of ${rows.length} platforms`
      : count.dataset.total;
    empty.hidden = shown !== 0;
  }
  count.dataset.total = count.textContent;

  function openFromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    const row = id && document.getElementById(id);
    if (row && row.matches('[data-row]')) {
      row.open = true;
      row.hidden = false;
      row.scrollIntoView({ block: 'start' });
    }
  }

  search.addEventListener('input', filter);
  tag.addEventListener('change', filter);
  level.addEventListener('change', filter);
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
