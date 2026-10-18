import type { ComponentProps } from "react";

type Props = ComponentProps<"div"> & { delay?: number };

/**
 * Fades + slides content up as it scrolls into view, using a CSS scroll-driven animation (.reveal in globals.css).
 * No JavaScript needed: content is always visible on slow phones and browsers without support simply skip the effect.
 */
export function Reveal({ delay = 0, className = "", style, ...rest }: Props) {
  return <div className={`reveal ${className}`} style={delay ? { ...style, animationRangeStart: `entry ${Math.round(delay * 100)}%` } : style} {...rest} />;
}
