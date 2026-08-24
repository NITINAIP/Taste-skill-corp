/**
 * Presentation helpers for the product surface.
 *
 * Formatting lives here rather than in a section body so no JSX return block
 * carries number handling (CLAUDE.md section 2, rule 2).
 */
const bahtFormatter = new Intl.NumberFormat("th-TH", {
  maximumFractionDigits: 0,
})

/** 6900 -> "6,900". The unit string travels with the figure from the content file. */
export function formatBaht(amount: number): string {
  return bahtFormatter.format(amount)
}
