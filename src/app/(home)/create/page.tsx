'use client';

import * as Figma from 'figma-api';

import UserProfile from '@components/UserProfile';

export default function HomePage() {
  const figmaApi = new Figma.Api({
    personalAccessToken: process.env.FIGMA_TOKEN as string
  });

  figmaApi.getFile('Bibata.live').then((file) => {
    console.log(file);
  });

  return (
    <div>
      <header>
        <h1>Bibata Live</h1>
        <UserProfile />
      </header>
      <h3>Customize your Bibata cursors</h3>
    </div>
  );
}
