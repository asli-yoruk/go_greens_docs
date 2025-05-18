// src/pages/custom-page.js
import React from 'react';
import Layout from '@theme/Layout';
import DocPageLayout from '@theme/Layout'; // Import the Docs layout
import DocItem from '@theme/DocItem'; // Import the Docs item component

const customContent = `
# Custom Page Title

This is a custom page with the same layout as the Docs section.

- You can use Markdown here.
- It supports all the features of the Docs layout.
`;

export default function CustomPage() {
  return (
    <Layout title="Custom Page" description="A custom page with Docs layout">
      <DocPageLayout>
        <DocItem
          content={{
            frontMatter: { title: 'Custom Page Title' },
            metadata: { formattedLastUpdatedAt: 'Today' },
            contentTitle: 'Custom Page Title',
            content: customContent,
          }}
        />
      </DocPageLayout>
    </Layout>
  );
}