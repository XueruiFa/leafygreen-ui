import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { Variant, Language } from '@leafygreen-ui/syntax';
import Code from '.';

const jsSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));
`;

storiesOf('Code', module).add(
  'Default',
  () => {
    const margin = 50;
    const wrapperStyle = css`
      margin: ${margin}px;
      max-width: calc(100% - ${margin * 2}px);
    `;

    return (
      <div className={wrapperStyle}>
        <Code
          showLineNumbers={boolean('Show line numbers', false)}
          showWindowChrome={boolean('Show window chrome', false)}
          chromeTitle={text('Chrome label', 'directory/fileName.js')}
          variant={select('Variant', Object.values(Variant), Variant.Light)}
          language={select('Language', Object.values(Language), Language.Auto)}
          copyable={boolean('copyable', true)}
          withText={boolean('withText', true)}
        >
          {text('Code snippet', jsSnippet)}
        </Code>
      </div>
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  },
);
