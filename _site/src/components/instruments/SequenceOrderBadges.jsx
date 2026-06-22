import './SequenceOrderBadges.css'

/**
 * @param {{ orders?: number[] }} props
 */
export default function SequenceOrderBadges({ orders = [] }) {
  if (!orders.length) return null

  return (
    <span className="sequence-orders" aria-hidden="true">
      {orders.map((order) => (
        <span key={order} className="sequence-orders__badge">
          {order}
        </span>
      ))}
    </span>
  )
}
