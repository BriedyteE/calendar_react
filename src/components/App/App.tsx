import Styles from "./app.module.css";

function App() {
  return (
    <div className={Styles.appWrapper}>
      <header className={Styles.header}></header>
      <div className={Styles.sidebarAndMain}>
        <aside className={Styles.sidebar}></aside>
        <main className={Styles.main}></main>
      </div>
    </div>
  );
}

export default App;
