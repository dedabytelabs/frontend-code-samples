// Owner-approved public excerpt from independent web archive; vanilla JS, not React.
// Product shell origin: Flowith per source README; AI-assisted project development.
// Published with owner approval. Exact manual line-level authorship is not established.
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getInitials(name = '') {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('') || 'SF';
}

function getProfileUrl(member) {
  const src = member?.profile || member?.profile_path || '';
  if (!src) return '';
  if (src.startsWith('http')) return src;
  return `https://image.tmdb.org/t/p/w300${src}`;
}

function getPersonHref(member) {
  const id = encodeURIComponent(member?.id || member?.name || 'unknown');
  const name = encodeURIComponent(member?.name || 'Unknown');
  return `#/person/${id}?name=${name}`;
}

export function renderCastCarousel(cast) {
  if (!cast || cast.length === 0) return '';
  return `
    <section class="py-10 cast-section">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div class="flex items-center gap-2 mb-6">
          <i data-lucide="users" class="w-4 h-4 text-sf-red"></i>
          <span class="text-xs font-semibold uppercase tracking-wider text-sf-red">Starring</span>
        </div>
        <h2 class="font-display font-bold text-2xl sm:text-3xl mb-6">Cast</h2>
        <div class="scroll-row flex gap-4 overflow-x-auto pb-4">
          ${cast.map(member => {
            const name = escapeHtml(member.name || 'Unknown');
            const character = escapeHtml(member.character || member.roles?.[0]?.character || '');
            const profile = getProfileUrl(member);
            const initials = escapeHtml(getInitials(member.name));
            const href = getPersonHref(member);
            return `
              <a href="${href}" data-person-href="${href}" class="cast-card flex-shrink-0 w-[140px] sm:w-[160px] group" aria-label="View actor page for ${name}">
                <div class="cast-photo relative aspect-[2/3] rounded-xl overflow-hidden bg-sf-charcoal mb-3 border border-white/5">
                  ${profile ? `
                    <img src="${profile}" 
                         onerror="this.classList.add('hidden'); this.parentElement.querySelector('.cast-fallback').classList.remove('hidden');"
                         alt="${name}" loading="lazy" 
                         class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ` : ''}
                  <div class="cast-fallback ${profile ? 'hidden' : ''}">
                    <span>${initials}</span>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                  <div class="cast-open-badge"><i data-lucide="external-link" class="w-3 h-3"></i></div>
                </div>
                <div class="px-1">
                  <p class="font-semibold text-sm truncate group-hover:text-sf-red transition">${name}</p>
                  <p class="text-xs text-sf-mist truncate">${character}</p>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}
