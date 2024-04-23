import { Page } from "../test/layouts/Page";
import { ReactChannel } from "../test/router/Channel";

export const ReactComponent = ReactChannel(({ params, pathname, data }) => {
  console.log(params, pathname, data);
  return (
    <Page headline="Hello">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '2000px',
        width: '100%',
        backgroundColor: 'lightblue',
      }}>
        hello!
      </div>
    </Page>
  );
});