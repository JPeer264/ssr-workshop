import { FC } from 'react';
import { Helmet as ReactHelmet } from 'react-helmet-async';

const Helmet: FC = () => (
  <ReactHelmet>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
    <title>SSR app</title>
  </ReactHelmet>
);

export default Helmet;
