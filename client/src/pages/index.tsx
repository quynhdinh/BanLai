import React from 'react';
import {
  Page,
  Navbar,
  NavTitleLarge,
  Card
} from 'zmp-framework/react';

const HomePage = () => {

  return (
    <Page name="home" navbarLarge>
      {/* Top Navbar */}
      <Navbar >
        <NavTitleLarge>BanLai</NavTitleLarge>
      </Navbar>
      {/* Page content */}
      <Card inset>
        <p>Here is your blank ZMP app. Let's see what we have here.</p>
      </Card>

    </Page>
  );
}
export default HomePage;