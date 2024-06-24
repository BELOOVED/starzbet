import { of } from "rxjs";
import { depositLinkReceiveAction } from "../BankingActions";

const depositFormStoreLink = (url: string) => () => of(depositLinkReceiveAction(url));

export { depositFormStoreLink };
