// Brick ECU Mini Brick download asset is resolved from the latest successful
// GitHub release, not from the unbuilt branch tip or an upstream MRE bundle.
(async function loadMiniBrickRelease() {
  const button = document.getElementById('mini-brick-release-download');
  const status = document.getElementById('mini-brick-release-status');
  if (!button || !status) return;
  const repoReleases = 'https://github.com/sethfrnz33-droid/rusefi/releases';
  button.href = repoReleases;
  button.textContent = 'View Mini Brick releases';
  try {
    const response = await fetch('https://api.github.com/repos/sethfrnz33-droid/rusefi/releases?per_page=100', {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) throw new Error('GitHub releases API status ' + response.status);
    const releases = await response.json();
    const published = releases
      .filter(release => !release.draft && /^mini-brick-[a-f0-9]{12}$/.test(release.tag_name))
      .sort((a, b) => Date.parse(b.published_at || b.created_at) - Date.parse(a.published_at || a.created_at));
    const latest = published.find(release =>
      Array.isArray(release.assets) &&
      release.assets.some(asset => asset.name === 'rusefi_bundle_mini_brick_f4.zip' && asset.browser_download_url)
    );
    if (!latest) {
      status.textContent = 'No completed Mini Brick F407 firmware release is available yet. Check the development releases for build status.';
      return;
    }
    const bundle = latest.assets.find(asset => asset.name === 'rusefi_bundle_mini_brick_f4.zip');
    button.href = bundle.browser_download_url;
    button.textContent = 'Download experimental Mini Brick ZIP';
    const date = new Date(latest.published_at || latest.created_at);
    status.textContent = 'Experimental build ' + latest.tag_name +
      (Number.isFinite(date.getTime()) ? ' · published ' + date.toLocaleDateString() : '') +
      '. Not production validated; confirm hardware compatibility before flashing.';
  } catch (error) {
    status.textContent = 'Could not check release availability automatically. Open GitHub releases for the latest Mini Brick build.';
  }
})();
