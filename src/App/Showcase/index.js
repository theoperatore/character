import React from 'react';
import DocumentTitle from 'react-document-title';

export default function Showcase() {
  return (<DocumentTitle title="Showcase">
    <section>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <p>Body copy</p>
      <p className="fa fa-user" />
      <p className="icon-shield" />
    </section>
  </DocumentTitle>);
}
