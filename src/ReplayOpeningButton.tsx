export default function ReplayOpeningButton() {
  return <button type="button" className="opening-replay" onClick={() => window.dispatchEvent(new Event('lumen:replay-opening'))}>
    重看本期序章
  </button>;
}

