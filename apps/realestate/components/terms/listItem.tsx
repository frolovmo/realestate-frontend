export default function ListItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
}
