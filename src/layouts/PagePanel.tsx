interface PagePanelProps {
  position: "right" | "bottom";
  children: React.ReactNode;
}

function PagePanel(props: PagePanelProps) {
  return <>{props.children}</>;
}

export { PagePanel };
