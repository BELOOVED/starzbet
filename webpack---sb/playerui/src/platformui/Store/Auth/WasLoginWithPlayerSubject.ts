import { BehaviorSubject } from "rxjs";
import type { TCallResponsePayload } from "@sb/sdk";
import type { call_LoginPlayerCommand } from "@sb/sdk/SDKClient/platformplayer";

const wasLoginWithPlayerSubject = new BehaviorSubject(false);

const checkLoginWithPlayer = (payload: TCallResponsePayload<typeof call_LoginPlayerCommand>) => {
  if(payload.player){
    wasLoginWithPlayerSubject.next(true);
  }
};

export{ wasLoginWithPlayerSubject, checkLoginWithPlayer };
