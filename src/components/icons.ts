/**
 * Single icon family for the whole project (DESIGN-BRIEF section 6).
 *
 * Phosphor, weight `regular`, imported from `/dist/ssr` so the same import works
 * in Server Components and Client Components alike. Nothing in this codebase may
 * import an icon from anywhere else, and nothing may hand-roll an SVG icon path.
 *
 * The first block is the set that vendored shadcn/ui primitives need, aliased to
 * the lucide names those primitives were written against.
 */
export {
  Check as CheckIcon,
  CaretDown as ChevronDownIcon,
  CaretUp as ChevronUpIcon,
  Circle as CircleIcon,
  CheckCircle as CircleCheckIcon,
  Info as InfoIcon,
  CircleNotch as Loader2Icon,
  XCircle as OctagonXIcon,
  Warning as TriangleAlertIcon,
  X as XIcon,
} from "@phosphor-icons/react/dist/ssr"

export {
  ArrowRight,
  ArrowUpRight,
  Buildings,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  ChatCircleText,
  Check,
  CheckCircle,
  ClipboardText,
  Clock,
  Coins,
  CreditCard,
  Envelope,
  FileText,
  FirstAid,
  Fire,
  GraduationCap,
  HandCoins,
  Handshake,
  House,
  IdentificationCard,
  List,
  MapPin,
  Minus,
  Moon,
  Phone,
  Question,
  ScalesIcon,
  ShieldCheck,
  Storefront,
  Suitcase,
  Sun,
  Truck,
  UserPlus,
  Users,
  Wrench,
  X,
} from "@phosphor-icons/react/dist/ssr"
