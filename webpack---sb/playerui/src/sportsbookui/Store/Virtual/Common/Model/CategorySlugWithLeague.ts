enum EVirtualCategorySlug {
  "turkish-football" = "turkish-football",
  "english-league" = "english-league",
  "english-football" = "english-football",
  "italian-league" = "italian-league",
  "italian-football" = "italian-football",
  "spanish-league" = "spanish-league",
  "spanish-football" = "spanish-football",
  "world-cup-football" = "world-cup-football",
  "euro-football" = "euro-football",
  "world-league" = "world-league"
}

const virtualCategorySlugOrderedList = [
  EVirtualCategorySlug["turkish-football"],
  EVirtualCategorySlug["english-league"],
  EVirtualCategorySlug["english-football"],
  EVirtualCategorySlug["italian-league"],
  EVirtualCategorySlug["italian-football"],
  EVirtualCategorySlug["spanish-league"],
  EVirtualCategorySlug["spanish-football"],
  EVirtualCategorySlug["world-cup-football"],
  EVirtualCategorySlug["euro-football"],
];

const isLeague = (slug: string) => [
  EVirtualCategorySlug["english-league"],
  EVirtualCategorySlug["spanish-league"],
  EVirtualCategorySlug["italian-league"],
  EVirtualCategorySlug["world-league"],
].includes(slug as EVirtualCategorySlug);

export { isLeague, virtualCategorySlugOrderedList, EVirtualCategorySlug };
