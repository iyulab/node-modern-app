const styles = {
  backgroundColor: "var(--gray-8)",
  boxShadow: "0px 0px 8px rgba(0,0,0,.6)",
}

function PageHeader({ children }) {
  return (
    <div style={styles}>
      {children}
    </div>
  );
}

export { PageHeader };