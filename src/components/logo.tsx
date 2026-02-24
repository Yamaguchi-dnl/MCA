import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="200"
      height="50"
      {...props}
    >
      <defs>
        <style>
          {
            '.logo-text { font-family: "PT Sans", sans-serif; font-weight: 700; }'
          }
        </style>
      </defs>
      <rect width="200" height="50" fill="transparent" />
      <path
        d="M10 10 L20 25 L10 40"
        stroke="hsl(var(--primary))"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 10 L35 25 L25 40"
        stroke="hsl(var(--secondary))"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="48"
        y="33"
        fontSize="24"
        className="logo-text"
        fill="hsl(var(--foreground))"
      >
        Sábado Total MCA
      </text>
    </svg>
  );
}
