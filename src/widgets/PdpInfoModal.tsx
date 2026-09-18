import { useEffect, type ReactNode } from "react";

type Props = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/** Info sheet on PDP — same modal chrome as Account (acc-modal). */
export function PdpInfoModal({ title, onClose, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="acc-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="acc-modal pdp-info-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdp-info-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="acc-modal__close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <h2 id="pdp-info-title" className="pdp-info-modal__title">
          {title}
        </h2>
        <div className="pdp-info-modal__body">{children}</div>
      </div>
    </div>
  );
}

export type PdpInfoKind = "delivery" | "payment" | "security" | "returns" | "seller";

export const PDP_INFO: Record<PdpInfoKind, { title: string; body: ReactNode }> = {
  delivery: {
    title: "Delivery",
    body: (
      <>
        <p>We ship to most addresses. Estimated delivery times:</p>
        <ul>
          <li>
            <strong>Standard</strong> — 3–7 business days
          </li>
          <li>
            <strong>Express</strong> — 1–3 business days (extra fee at checkout)
          </li>
          <li>
            <strong>Pickup</strong> — ready at partner points when marked on the order
          </li>
        </ul>
        <p className="muted">Tracking appears in My orders after the parcel is handed to the carrier.</p>
      </>
    ),
  },
  payment: {
    title: "Payment methods",
    body: (
      <>
        <p>Accepted payment options on Perry:</p>
        <ul>
          <li>Visa / Mastercard</li>
          <li>Cash on delivery (where available)</li>
          <li>Wallet / online banking (demo)</li>
        </ul>
        <p className="muted">Card data is processed by a secure payment gateway; Perry does not store full card numbers.</p>
      </>
    ),
  },
  security: {
    title: "Security",
    body: (
      <>
        <p>Your connection and payments are protected:</p>
        <ul>
          <li>Encrypted transport (HTTPS) for the storefront and API</li>
          <li>JWT session for your account actions</li>
          <li>Order and personal data visible only to you (and admins for support)</li>
        </ul>
        <p className="muted">Never share one-time codes or passwords with anyone claiming to be support.</p>
      </>
    ),
  },
  returns: {
    title: "Returns",
    body: (
      <>
        <p>You may return unused items in original packaging within <strong>14 days</strong> of delivery.</p>
        <ul>
          <li>Open the order in <strong>My orders</strong> → Details for cancellation tips on early statuses</li>
          <li>Refunds go back to the original payment method after inspection</li>
          <li>Personalized or sealed hygiene goods may be non-returnable</li>
        </ul>
        <p className="muted">Full rules: Terms and conditions in the footer.</p>
      </>
    ),
  },
  seller: {
    title: "About seller",
    body: (
      <>
        <p>
          <strong>Perry Marketplace</strong> — verified storefront for this catalogue demo.
        </p>
        <ul>
          <li>Ships from partner warehouses</li>
          <li>Customer support via the Support links in the footer</li>
          <li>Ratings on product pages reflect buyer reviews after purchase</li>
        </ul>
        <p className="muted">Seller contact and policies can be extended when multi-vendor mode is enabled.</p>
      </>
    ),
  },
};
