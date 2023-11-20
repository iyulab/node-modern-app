const styles = {
  backgroundColor: "var(--gray-8)",
  borderBottom: "1px solid var(--gray-5)",
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