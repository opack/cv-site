/**
 * Figures that evolve over time and are quoted in several content files.
 * Update them here only: `.ts` content interpolates them, `.md` content imports
 * them in a `<script>` block and renders `{figures.xxx}`.
 * Values are display strings, already formatted the way the text uses them.
 */
const careerStart = '2007-10'

/** Full years elapsed since a YYYY-MM date, at build time. */
function yearsSince(yearMonth: string): number {
	const [year, month] = yearMonth.split('-').map(Number)
	const now = new Date()
	return Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (year * 12 + month)) / 12)
}

export const figures = {
	/** First job, YYYY-MM. Also starts the landing page timeline. */
	careerStart,
	/** Envo accounts created, quoted as "plus de …". */
	envoAccounts: '3 100',
	/** Envo Google Play rating, out of 5. */
	envoRating: '4,6',
	/** Envo releases shipped… */
	envoReleases: '59',
	/** …over this period… */
	envoReleasePeriod: 'onze mois',
	/** …i.e. one release every… */
	envoReleaseCadence: 'six jours',
	/** Years of experience since the first job, computed at build time. */
	experienceYears: String(yearsSince(careerStart)),
	/** Years working solo on my own products. */
	soloYears: 'deux'
} as const
