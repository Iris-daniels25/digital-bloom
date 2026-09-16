import { steps } from '../data/content'

function Journey() {
  return (
    <section className="section" aria-labelledby="journey-title">
      <div className="section-heading">
        <h2 id="journey-title">Your Digital Bloom Journey</h2>
        <p>A simple path designed to support progress without overwhelm.</p>
      </div>
      <ol className="steps">
        {steps.map((step) => (
          <li className="card" key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Journey
