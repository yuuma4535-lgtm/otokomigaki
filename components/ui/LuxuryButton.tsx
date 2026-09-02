import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  /** 結果ページCTA向け：控えめなホバー拡大 */
  microInteraction?: boolean;
};

type LuxuryButtonProps =
  | (BaseProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (BaseProps & {
      href: string;
      target?: string;
      rel?: string;
      /** Next.js Link の prefetch。未指定時はデフォルト動作 */
      prefetch?: boolean;
    });

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function LuxuryButton(props: LuxuryButtonProps) {
  const { children, className, variant = "primary", microInteraction = false } =
    props;

  const base =
    variant === "primary"
      ? `ui-button-primary pointer-events-auto${microInteraction ? " ui-button-primary-micro" : ""}`
      : "inline-flex pointer-events-auto items-center text-sm tracking-[0.16em] text-muted transition-colors duration-300 hover:text-ivory-soft";

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        prefetch={props.prefetch}
        className={cx(base, className)}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
  const {
    children: _c,
    className: _cl,
    variant: _v,
    ...rest
  } = buttonProps;

  return (
    <button type="button" className={cx(base, className)} {...rest}>
      {children}
    </button>
  );
}
