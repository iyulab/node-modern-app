import { ReactChannel } from "./router/Channel";

export const ReactComponent = ReactChannel(({ params, pathname, data }) => {
  console.log(params, pathname, data);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: 'lightblue',
    }}>
      hello  
    </div>
  );
});