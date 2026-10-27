import { useId } from 'react'
import { getPackagePayment, isVerifiedPayment } from '../config/paymentLinks'
import './PackagePayment.css'

export default function PackagePayment({ category, name, price }) {
  const noteId = useId()
  const payment = getPackagePayment(category, name, price)
  if (!payment) return null
  const verified = isVerifiedPayment(payment, name)
  return (
    <div className="package-payment">
      {payment.scheduled && <p className="package-availability" id={`${noteId}-availability`}>Confirm availability before purchasing.</p>}
      {verified ? (
        <a className="button button-primary package-pay-now" href={payment.url} target="_blank" rel="noopener noreferrer" aria-label={`Pay Now for ${name}, ${price} USD (opens Stripe in a new tab)`} aria-describedby={payment.scheduled ? `${noteId}-availability ${noteId}-checkout` : `${noteId}-checkout`}>
          Pay Now <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <button className="button package-pay-now" type="button" disabled aria-describedby={`${noteId}-checkout`}>Pay Now</button>
      )}
      <p className="package-checkout-note" id={`${noteId}-checkout`}>{verified ? 'Stripe checkout · USD · opens in a new tab' : 'Checkout unavailable while this payment link is awaiting verification. Please use the inquiry option below.'}</p>
    </div>
  )
}
