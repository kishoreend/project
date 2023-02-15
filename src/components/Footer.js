import React from "react";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <span className="t4f_label">
        © {new Date().getFullYear()} {t("endeavour-technologies")}
      </span>
    </div>
  );
};

export default Footer;
