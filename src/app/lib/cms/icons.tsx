import type { ComponentType } from "react";
import {
  Award,
  BarChart3,
  Globe,
  Lightbulb,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Phone,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { IconKey } from "@/app/lib/cms/homeContent";

export const iconMap = {
  shopping: ShoppingCart,
  monitor: Monitor,
  megaphone: Megaphone,
  share: Share2,
  search: Search,
  palette: Palette,
  trending: TrendingUp,
  target: Target,
  zap: Zap,
  users: Users,
  award: Award,
  globe: Globe,
  chart: BarChart3,
  lightbulb: Lightbulb,
  pentool: PenTool,
  rocket: Rocket,
  linechart: LineChart,
  phone: Phone,
  mail: Mail,
  map: MapPin,
} satisfies Record<IconKey, ComponentType<{ className?: string }>>;

export function getIcon(key: IconKey) {
  return iconMap[key] || Target;
}
