import { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import { withPreventDefault } from "@sb/utils";
import { type TSportsbook_NewCoupon_Fragment } from "@sb/graphql-client/PlayerUI";

const useCouponNameHandle =
  (saving: boolean, newCoupon: TSportsbook_NewCoupon_Fragment | undefined, saveHandle: (name: string) => void) => {
    const [name, setName] = useState("");

    useEffect(
      () => {
        if (newCoupon?.name) {
          setName(newCoupon.name);
        } else {
          setName("");
        }
      },
      [saving, newCoupon],
    );

    const inputHandle = useCallback((e: SyntheticEvent<HTMLInputElement>) => setName(e.currentTarget.value), [setName]);

    const submitHandle = useCallback(
      // @react-compiler-warn
      withPreventDefault(
        () => {
          if (!name) {
            return;
          }

          saveHandle(name);
        },
      ),
      [saveHandle, name],
    );

    return [name, inputHandle, submitHandle];
  };

const useCouponNameHandleNew =
  (newCoupon: TSportsbook_NewCoupon_Fragment | undefined, saveHandle: (name: string) => void) => {
    const [name, setName] = useState(newCoupon?.name ?? "");

    const inputHandle = useCallback((e: SyntheticEvent<HTMLInputElement>) => setName(e.currentTarget.value), [setName]);

    const submitHandle = useCallback(
      withPreventDefault(
        () => {
          if (!name) {
            return;
          }

          saveHandle(name);
        },
      ),
      [saveHandle, name],
    );

    return [name, inputHandle, submitHandle];
  };

export { useCouponNameHandle, useCouponNameHandleNew };
