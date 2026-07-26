import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
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
    });

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function LuxuryButton(props: LuxuryButtonProps) {
  const { children, className, variant = "primary" } = props;

  const base =
    variant === "primary"
      ? "ui-button-primary pointer-events-auto"
      : "inline-flex pointer-events-auto items-center text-sm tracking-[0.16em] text-muted transition-colors duration-300 hover:text-ivory-soft";

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
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
