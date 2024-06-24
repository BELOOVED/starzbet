// @ts-nocheck
import classes from "./Main.module.css";

const Main = ({ children }) => (
  <main className={classes.main}>
    {children}
  </main>
);
Main.displayName = "Main";

export { Main };
