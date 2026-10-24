// Owner-approved public formatted excerpt from the independent Delish web archive.
// Vanilla JS, not React. AI-assisted development; line authorship unverified.
// Assumes existing pantryInput/resultCount elements, render(), toast(), and
// the application's recipes variable. This is an excerpt, not a standalone app.
// The backend proxy, credentials, worker configuration and full UI are omitted.
const $ = id => document.getElementById(id);

async function spoon(path, params = {}) {
  const url = new URL('/api/spoonacular', window.location.origin);
  url.searchParams.set('path', path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.status === 'failure') {
    throw new Error(data.message || 'Spoonacular request failed');
  }
  return data;
}

async function pantrySearch() {
  try {
    const ingredients = $('pantryInput').value
      .split(/[\n,]/)
      .map(value => value.trim())
      .filter(Boolean)
      .join(',');
    if (!ingredients) return toast('Add a few pantry ingredients first.');

    $('resultCount').textContent = 'Searching pantry matches...';
    location.hash = 'discover';
    const data = await spoon('/recipes/findByIngredients', {
      ingredients,
      number: 24,
      ranking: 1,
      ignorePantry: true,
    });
    recipes = (data || []).map(recipe => ({
      ...recipe,
      readyInMinutes: null,
      diets: [],
      sourceName: `Uses ${recipe.usedIngredientCount || 0}`,
    }));
    $('resultCount').textContent = `${recipes.length} pantry matches`;
    render(recipes);
  } catch (error) {
    toast(error.message);
  }
}
