import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import globe from "../../assets/icons/globe.png";
import { Constlanguage } from "../../ConstLanguage";
import i18next from "i18next";
import cookies from "js-cookie";

const LanguageDropdown = (props) => {
  const [LangCode, setLangCode] = useState(cookies.get("i18next"));
  const CurrentLanguageName = Constlanguage.find((l) => l.code === cookies.get("i18next"));
  const [selLang, setSelLang] = useState(CurrentLanguageName.name);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <React.Fragment>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-sm-inline-block d-inline-flex">
        <DropdownToggle tag="button" className="btn header-item waves-effect text-small">
          <img className="" src={globe} alt="Header Language" height="12" />
          {"  "}
          <span className="pb-1">{selLang}</span>
        </DropdownToggle>

        <DropdownMenu>
          {Constlanguage.map((l) => (
            <DropdownItem
              key={l.code}
              // active={props.currentLanguage.code === l.code ? true : false}
              href=""
              onClick={(e) => (i18next.changeLanguage(l.code), setLangCode(l.code), setSelLang(l.name))}
              className="notify-item"
              value={l.name}
            >
              <span className="text-small">{l.name}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
