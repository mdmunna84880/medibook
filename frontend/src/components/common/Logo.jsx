/** @format */

import { cn } from "@/utils/cn";

function Logo() {
  return (
    <svg
      width="160"
      height="60"
      viewBox="0 0 460 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("whitespace-nowrap select-none")}
    >
      <g id="MediBook Logo">
        <path
          id="Calendar Icon"
          d="M40 45H100V110H40V45Z"
          stroke="#eebbc3"
          stroke-width="8"
          stroke-linejoin="round"
        />
        <path
          id="Calendar Top Line"
          d="M40 45V30M100 45V30"
          stroke="#eebbc3"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          id="Medical Cross"
          d="M60 77.5H80M70 67.5V87.5"
          stroke="#eebbc3"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          id="Checkmark"
          d="M85 95L92.5 102.5L105 90"
          stroke="#eebbc3"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <text
          id="MediBook Text"
          x="130"
          y="95"
          font-family="sans-serif"
          font-size="64"
          font-weight="bold"
        >
          <tspan fill="#eebbc3">Medi</tspan>
          <tspan fill="#fffffe">Book</tspan>
        </text>
      </g>
    </svg>
  );
}

export default Logo;
