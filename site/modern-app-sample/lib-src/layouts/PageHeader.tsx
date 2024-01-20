interface PageHeaderProps {
  children: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
  return <>{props.children}</>;
}

export { PageHeader };
