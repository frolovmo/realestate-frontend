export default function InputHint({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="text-graytext text-xs">{children}</div>;
}
