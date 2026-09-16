import { offerings } from '../data/content'

function Offerings() {
  return (
    <section className="section" id="programs" aria-labelledby="programs-title">
      <div className="section-heading">
        <h2 id="programs-title">What We Offer</h2>
        <p>Focused support for your learning, systems, and digital presence.</p>
      </div>
      <div className="card-grid" role="list">
        {offerings.map((item) => (
          <article className="card" key={item.title} role="listitem">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Offerings
