import { useCallback, useMemo } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  submitContactEnquiry,
  type ContactEnquiryPayload,
  type LeadReceipt,
} from "@/api/services/lead.service"
import { useMutation } from "@/hooks/use-mutation"
import { useProducts } from "@/hooks/use-products"

import {
  contactEnquirySchema,
  emptyContactEnquiry,
  normalisePhone,
  QUOTE_TOPIC,
  UNSPECIFIED_PRODUCT,
  UNSPECIFIED_PRODUCT_LABEL,
  type ContactEnquiryValues,
  type TopicOption,
} from "@/pages/contact/contact-enquiry.schema"

/**
 * Everything the contact form decides, decided here.
 *
 * The component below renders fields and reads status. Which values become the
 * payload, when the product line is asked for, what a retry does, and what a
 * failure leaves on screen are all resolved in this hook, so the JSX stays a
 * description of the form rather than a description of the submission.
 *
 * A failed submission keeps every typed value. useMutation never touches the
 * form, and this hook only calls form.reset() when the reader asks to send a
 * second enquiry.
 */
function toPayload(values: ContactEnquiryValues): ContactEnquiryPayload {
  const isQuote = values.topic === QUOTE_TOPIC

  return {
    fullName: values.fullName.trim(),
    phone: normalisePhone(values.phone),
    email: values.email.trim(),
    topic: values.topic,
    productSlug: isQuote ? values.productSlug || undefined : undefined,
    message: values.message.trim(),
    consent: values.consent,
  }
}

export function useContactEnquiry() {
  const form = useForm<ContactEnquiryValues>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: emptyContactEnquiry,
    mode: "onTouched",
  })

  const mutation = useMutation<ContactEnquiryPayload, LeadReceipt>(
    (payload, signal) => submitContactEnquiry(payload, signal)
  )

  const { products, isLoading: isLoadingProducts } = useProducts()

  // The unspecified option is always first, so the field stays answerable even
  // if the catalogue request has not landed yet.
  const productOptions = useMemo<TopicOption[]>(
    () => [
      { value: UNSPECIFIED_PRODUCT, label: UNSPECIFIED_PRODUCT_LABEL },
      ...products.map((product) => ({
        value: product.slug,
        label: product.name,
      })),
    ],
    [products]
  )

  const topic = useWatch({ control: form.control, name: "topic" })
  const needsProductLine = topic === QUOTE_TOPIC

  const { handleSubmit, reset: resetForm } = form
  const { submit: submitEnquiry, reset: resetMutation } = mutation

  const submit = useMemo(
    () =>
      handleSubmit(async (values) => {
        await submitEnquiry(toPayload(values))
      }),
    [handleSubmit, submitEnquiry]
  )

  const startNewEnquiry = useCallback(() => {
    resetMutation()
    resetForm(emptyContactEnquiry)
  }, [resetMutation, resetForm])

  return {
    form,
    submit,
    startNewEnquiry,
    productOptions,
    isLoadingProducts,
    needsProductLine,
    status: mutation.status,
    isSubmitting: mutation.isSubmitting,
    error: mutation.error,
    receipt: mutation.data,
  }
}

export type ContactEnquiry = ReturnType<typeof useContactEnquiry>
