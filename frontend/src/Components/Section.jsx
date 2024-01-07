import React from 'react'

const Section = ({ id, title, comp }) => (
    <div>
      <section id={id}>
        {comp}
      </section>
    </div>
  );
export default Section;