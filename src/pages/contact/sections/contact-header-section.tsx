import { AsyncBoundary, LinesSkeleton } from "@/components/common/async-boundary"
import { Reveal } from "@/components/common/reveal"
import { Section } from "@/components/common/section"
import { SectionHeading } from "@/components/common/section-heading"
import { ChatCircleText, Envelope, Phone } from "@/components/icons"

import {
  useContactChannels,
  type ContactChannel,
  type ContactChannelId,
} from "@/pages/contact/use-contact-channels"

const channelIcon: Record<ContactChannelId, typeof Phone> = {
  phone: Phone,
  email: Envelope,
  line: ChatCircleText,
}

/**
 * Section 1: page header with the direct channels inline.
 *
 * A reader who already knows what they want should not have to scroll past a
 * form to find a phone number, so the three channels sit in the header on
 * hairlines. They are links, not cards: nothing here is elevated, because
 * nothing here is a separate destination.
 */
export function ContactHeaderSection() {
  const { channels, isLoading, error, refetch } = useContactChannels()

  return (
    <Section>
      <Reveal>
        <SectionHeading
          as="h1"
          title="ติดต่อเรา"
          lead="ติดต่อทีมงานได้โดยตรงตามช่องทางด้านล่าง หรือกรอกแบบฟอร์มไว้แล้วให้เจ้าหน้าที่ติดต่อกลับพร้อมรายละเอียดความคุ้มครองและเบี้ยประกัน"
        />
      </Reveal>
      <AsyncBoundary
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
        skeleton={<LinesSkeleton lines={3} />}
      >
        <ul className="mt-12 grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {channels.map((channel) => (
            <ChannelRow key={channel.id} channel={channel} />
          ))}
        </ul>
      </AsyncBoundary>
    </Section>
  )
}

function ChannelRow({ channel }: { channel: ContactChannel }) {
  const Icon = channelIcon[channel.id]

  return (
    <li className="py-6 sm:px-7 sm:first:pl-0 sm:last:pr-0">
      <p className="flex items-center gap-2 text-sm leading-[1.7] text-muted-foreground">
        <Icon className="size-5 text-primary" aria-hidden />
        {channel.label}
      </p>
      <a
        href={channel.href}
        target={channel.isExternal ? "_blank" : undefined}
        rel={channel.isExternal ? "noreferrer" : undefined}
        className="mt-2 inline-flex min-h-11 items-center font-display text-xl leading-[1.4] font-semibold text-foreground underline-offset-4 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:outline-none"
      >
        {channel.value}
      </a>
      <p className="text-sm leading-[1.7] text-muted-foreground">
        {channel.helper}
      </p>
    </li>
  )
}
