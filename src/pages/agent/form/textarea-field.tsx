import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import type { AgentApplicationForm } from "../agent-application.schema"
import type { TextFieldName } from "./field-types"

export function TextareaField({
  name,
  label,
  description,
  rows = 4,
}: {
  name: TextFieldName
  label: string
  description: string
  rows?: number
}) {
  const { control } = useFormContext<AgentApplicationForm>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormDescription className="leading-[1.7]">
            {description}
          </FormDescription>
          <FormControl>
            <Textarea rows={rows} {...field} />
          </FormControl>
          <FormMessage role="alert" />
        </FormItem>
      )}
    />
  )
}
