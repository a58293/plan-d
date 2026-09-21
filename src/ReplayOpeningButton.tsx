export default function ReplayOpeningButton() {
  return <button type="button" className="opening-replay" onClick={() => window.dispatchEvent(new Event('lumen:replay-opening'))}>
    <span aria-hidden="true">▷</span> 重看本期序章
  </button>;
}
