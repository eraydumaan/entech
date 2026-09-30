export default function Icon({ name, size = 20, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    inbox: (
      <>
        <path d="M4 4h16l2 10v6H2v-6L4 4Z" />
        <path d="M2 14h6l2 3h4l2-3h6" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5" />
      </>
    ),
    chart: (
      <>
        <path d="M4 3v17h17M8 15v-4M13 15V7M18 15v-6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3a14 14 0 0 0 6 6l3-3 5 3-2 4C10 23 1 14 3 5l4-2Z" />
    ),
    message: (
      <>
        <path d="M21 11a9 9 0 0 1-9 9H3l1-5a9 9 0 1 1 17-4Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    note: (
      <>
        <path d="M5 3h14v13l-5 5H5V3Z" />
        <path d="M14 21v-5h5M8 8h8M8 12h6" />
      </>
    ),
    tool: (
      <path d="M14 6a5 5 0 0 0-6 6l-5 5a3 3 0 0 0 4 4l5-5a5 5 0 0 0 6-6l-3 3-4-4 3-3Z" />
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 11h18M7 15h3M14 15h3" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.grid}
    </svg>
  );
}
