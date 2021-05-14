import * as React from "react";

import { useLocalization } from "@progress/kendo-react-intl";

export const MessageComponent = ({ messageKey, defaultMessage }) => {
  const localizationService = useLocalization();

  return localizationService.toLanguageString(messageKey, defaultMessage);
};
