import { ReactPage } from "./layouts/Page";

export const ReactComponent = ReactPage(({ params, pathname, data }) => {
  console.log(params, pathname, data);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'lightblue',
    }}>
      hello  
    </div>
  );
});