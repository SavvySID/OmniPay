type Props = {
  estimate: any;
  loading: boolean;
};

export default function RouteDetails({ estimate, loading }: Props) {
  return (
    <div className="section">
      <h3 style={{ margin: 0, marginBottom: 10 }}>Estimated Route</h3>
      {loading && <div style={{ color: "var(--muted)" }}>Calculating best path…</div>}
      {estimate && (
        <div className="card" style={{ marginTop: 8 }}>
          <div className="card-inner" style={{ display: "grid", gap: 6 }}>
            <div><span style={{ color: "var(--muted)" }}>Best route:</span> {estimate.best_route}</div>
            <div><span style={{ color: "var(--muted)" }}>Estimated time:</span> {estimate.estimated_time}</div>
            <div><span style={{ color: "var(--muted)" }}>Total fee (USDT):</span> {estimate.total_fee_usdt}</div>
            <div><span style={{ color: "var(--muted)" }}>Expected output (USDT):</span> {estimate.expected_output_usdt}</div>
          </div>
        </div>
      )}
    </div>
  );
}


