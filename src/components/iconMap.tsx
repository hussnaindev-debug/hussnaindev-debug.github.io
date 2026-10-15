import {
  Sword, Swords, Bot, Zap, Map, Film, Backpack, Dices, Users, Coins, Grab,
  Shield, Sparkles, Package, ShoppingBag, Gauge, Crosshair, Factory, Mountain,
  PawPrint, Gift, Trophy, Waves, Bug, Fence, Gamepad2, LayoutGrid, Layers,
  Smile, Cpu, Star, Target, Route, MonitorSmartphone, Joystick, Globe, Orbit,
  Gem, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Sword, Swords, Bot, Zap, Map, Film, Backpack, Dices, Users, Coins, Grab,
  Shield, Sparkles, Package, ShoppingBag, Gauge, Crosshair, Factory, Mountain,
  PawPrint, Gift, Trophy, Waves, Bug, Fence, Gamepad2, LayoutGrid, Layers,
  Smile, Cpu, Star, Target, Route, MonitorSmartphone, Joystick, Globe, Orbit,
  Gem,
};

export function Icon({ name, size = 19 }: { name: string; size?: number }) {
  const C = map[name] || Gamepad2;
  return <C size={size} />;
}
