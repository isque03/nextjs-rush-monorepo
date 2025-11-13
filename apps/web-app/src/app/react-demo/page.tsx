export default function ReactDemoPage() {
  return (
    <div>
      <h1>React Demo Screen</h1>
      <p>
        This represents a future migrated screen implemented purely in React.
        Navigation between this and the legacy ExtJS page proves the incremental
        migration path.
      </p>
      {/* later: reuse shared-lib components, call mock APIs, etc. */}
    </div>
  );
}

