/**
 * Branch numbers are stored the way they are printed, "053 271 880", because
 * that is what a reader copies onto a form. A phone link needs the dialable
 * form, so the conversion happens here rather than inside a return block.
 */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  return digits.startsWith("0") ? `tel:+66${digits.slice(1)}` : `tel:${digits}`
}
