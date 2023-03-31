import React from "react";

import {
  cardTypesMap,
  getCardType,
  setInitialValidCardTypes,
  validateLuhn,
} from "./utils/cardHelpers";

export interface CallbackArgument {
  issuer: string;
  maxLength: number;
}

export type Focused = "name" | "number" | "expiry" | "cvc" | "";

export interface ReactCreditCardsProps {
  acceptedCards?: ReadonlyArray<string> | undefined;
  callback?: ((type: CallbackArgument, isValid: boolean) => void) | undefined;
  cvc: string | number;
  expiry: string | number;
  focused?: Focused | undefined;
  issuer?: string | undefined;
  locale?: { valid: string } | undefined;
  name: string;
  number: string | number;
  placeholders?: { name: string } | undefined;
  preview?: boolean | undefined;
}

export function ReactCreditCards(props: ReactCreditCardsProps) {
  const {
    acceptedCards = [],
    number,
    issuer,
    preview = false,
    expiry,
    cvc,
    focused,
    locale = {
      valid: "valid thru",
    },
    name,
    placeholders = {
      name: "YOUR NAME HERE",
    },
    callback,
  } = props;

  const [cardTypes, setCardTypes] = React.useState(setInitialValidCardTypes());
  const validCardTypes = React.useMemo(() => {
    if (acceptedCards?.length) {
      return cardTypes.filter((card) => acceptedCards.includes(card));
    }

    return cardTypes;
  }, [acceptedCards, cardTypes]);

  const cardOptions = React.useMemo(() => {
    let updatedIssuer = "unknown";

    if (number) {
      const validatedIssuer = getCardType(number);

      if (validCardTypes.includes(validatedIssuer as any)) {
        updatedIssuer = validatedIssuer;
      }
    }

    let maxLength = 16;

    if (cardTypesMap.amex.includes(updatedIssuer)) {
      maxLength = 15;
    } else if (cardTypesMap?.dinersclub.includes(updatedIssuer)) {
      maxLength = 14;
    } else if (["hipercard", "mastercard", "visa"].includes(updatedIssuer)) {
      maxLength = 19;
    }

    return {
      issuer: updatedIssuer,
      maxLength,
    };
  }, [number, validCardTypes]);

  const cardIssuer = React.useMemo(
    () => (preview && issuer ? issuer.toLowerCase() : cardOptions.issuer),
    [cardOptions.issuer, issuer, preview]
  );

  const cardNumber = React.useMemo(() => {
    let maxLength = preview ? 19 : cardOptions.maxLength;
    let nextNumber =
      typeof number === "number"
        ? number.toString()
        : String(number).replace(/[A-Za-z]| /g, "");

    if (isNaN(parseInt(nextNumber, 10)) && !preview) {
      nextNumber = "";
    }

    if (maxLength > 16) {
      maxLength = nextNumber.length <= 16 ? 16 : maxLength;
    }

    if (nextNumber.length > maxLength) {
      nextNumber = nextNumber.slice(0, maxLength);
    }

    while (nextNumber.length < maxLength) {
      nextNumber += "•";
    }

    if (
      cardTypesMap.amex.includes(cardIssuer) ||
      cardTypesMap.dinersclub.includes(cardIssuer)
    ) {
      const format = [0, 4, 10];
      const limit = [4, 6, 5];
      nextNumber = `${nextNumber.substr(
        format[0],
        limit[0]
      )} ${nextNumber.substr(format[1], limit[1])} ${nextNumber.substr(
        format[2],
        limit[2]
      )}`;
    } else if (nextNumber.length > 16) {
      const format = [0, 4, 8, 12];
      const limit = [4, 7];
      nextNumber = `${nextNumber.substr(
        format[0],
        limit[0]
      )} ${nextNumber.substr(format[1], limit[0])} ${nextNumber.substr(
        format[2],
        limit[0]
      )} ${nextNumber.substr(format[3], limit[1])}`;
    } else {
      for (let i = 1; i < maxLength / 4; i++) {
        const space_index = i * 4 + (i - 1);
        nextNumber = `${nextNumber.slice(0, space_index)} ${nextNumber.slice(
          space_index
        )}`;
      }
    }

    return nextNumber;
  }, [cardOptions.maxLength, cardIssuer, number, preview]);

  const cardExpiry = React.useMemo(() => {
    const date = typeof expiry === "number" ? expiry.toString() : expiry;
    let month = "";
    let year = "";

    if (date.includes("/")) {
      [month, year] = date.split("/");
    } else if (date.length) {
      month = date.substr(0, 2);
      year = date.substr(2, 6);
    }

    while (month.length < 2) {
      month += "•";
    }

    if (year.length > 2) {
      year = year.substr(2, 4);
    }

    while (year.length < 2) {
      year += "•";
    }

    return `${month}/${year}`;
  }, [expiry]);

  const updateValidCardTypes = React.useCallback(
    (acceptedCardsInput: readonly string[]) => {
      if (acceptedCardsInput.length) {
        setCardTypes(
          cardTypes.filter((card) => acceptedCardsInput.includes(card))
        );
        return;
      }

      const initialValidCardTypes = setInitialValidCardTypes();
      setCardTypes(initialValidCardTypes);
    },
    [cardTypes]
  );

  React.useEffect(() => {
    if (cardNumber !== number) {
      /* istanbul ignore else */
      if (typeof callback === "function") {
        callback(cardOptions, validateLuhn(String(number)));
      }
    }

    const initialValidCardTypes = setInitialValidCardTypes();
    if (initialValidCardTypes.toString() !== cardTypes.toString()) {
      updateValidCardTypes(acceptedCards);
    }
  }, [
    acceptedCards,
    callback,
    cardOptions,
    cardNumber,
    updateValidCardTypes,
    number,
    cardTypes,
  ]);

  return (
    <div key="Cards" className="rccs">
      <div
        className={[
          "rccs__card",
          `rccs__card--${cardIssuer}`,
          focused === "cvc" && cardIssuer !== "american-express"
            ? "rccs__card--flipped"
            : "",
        ]
          .join(" ")
          .trim()}
      >
        <div className="rccs__card--front">
          <div className="rccs__card__background" />
          <div className="rccs__issuer" />
          <div
            className={[
              "rccs__cvc__front",
              focused === "cvc" ? "rccs--focused" : "",
            ]
              .join(" ")
              .trim()}
          >
            {cvc}
          </div>
          <div
            className={[
              "rccs__number",
              cardNumber.replace(/ /g, "").length > 16
                ? "rccs__number--large"
                : "",
              focused === "number" ? "rccs--focused" : "",
              cardNumber.substr(0, 1) !== "•" ? "rccs--filled" : "",
            ]
              .join(" ")
              .trim()}
          >
            {cardNumber}
          </div>
          <div
            className={[
              "rccs__name",
              focused === "name" ? "rccs--focused" : "",
              name ? "rccs--filled" : "",
            ]
              .join(" ")
              .trim()}
          >
            {name || placeholders.name}
          </div>
          <div
            className={[
              "rccs__expiry",
              focused === "expiry" ? "rccs--focused" : "",
              cardExpiry.substr(0, 1) !== "•" ? "rccs--filled" : "",
            ]
              .join(" ")
              .trim()}
          >
            <div className="rccs__expiry__valid">{locale.valid}</div>
            <div className="rccs__expiry__value">{cardExpiry}</div>
          </div>
          <div className="rccs__chip" />
        </div>
        <div className="rccs__card--back">
          <div className="rccs__card__background" />
          <div className="rccs__stripe" />
          <div className="rccs__signature" />
          <div
            className={["rccs__cvc", focused === "cvc" ? "rccs--focused" : ""]
              .join(" ")
              .trim()}
          >
            {cvc}
          </div>
          <div className="rccs__issuer" />
        </div>
      </div>
    </div>
  );
}
