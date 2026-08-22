import { Link } from "react-router-dom";

export default function PrimaryAction({
  children,
  to,
  onClick,
  className = "",
}) {
  const classes = `primary-action ${className}`.trim();

  if (to)
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    );

  return (
    <button className={classes} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
