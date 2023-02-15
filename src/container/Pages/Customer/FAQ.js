import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

import { Accordion, AccordionContext } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Footer from "../../../components/Footer";
import SideNavBar from "../../../components/MobileLayout/SideNavBar";
import "../../../assets/styles/t4fstyle.scss";
import "../../../assets/styles/mobile.scss";
import config from "../../../container/app/navigation.json";

const FAQS = [
  {
    faq_id: 1,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 2,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 3,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 4,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 5,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },

  {
    faq_id: 6,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 7,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 8,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 8,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 10,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 11,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec perposuere cubilia cras porttitor condimentum orciuscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum uscipit. Leo maecenas in tristique, himenaeos elementum",
  },
  {
    faq_id: 12,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
  },
  {
    faq_id: 13,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
  },
  {
    faq_id: 13,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
  },
  {
    faq_id: 14,
    faq_question:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
    faq_answer:
      "Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor",
  },
];

const FAQ = () => {
  function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <button
        type="button"
        className="btn primary text-small"
        style={{
          fontWeight: isCurrentEventKey ? "bold" : "normal",
          textAlign: "Left",
          color: "#223554",
        }}
        onClick={decoratedOnClick}
      >
        <div className="d-flex justify-content-left">
          <span>{children}</span>
          <span className="text-end">
            <h5>{isCurrentEventKey ? "- " : "+ "}</h5>
          </span>
        </div>
      </button>
    );
  }
  return (
    <>
      <div className="mobile_wrapper">
        <div className="row mobilecontainer justify-content-center">
          <div className="w-100" style={{ maxWidth: "500px" }}>
            <SideNavBar id={3} />
            <div className="mobile_header_gray p-2">
              <span>
                <b>FAQ</b>
              </span>
            </div>
            <div className="mobilecontainer p-2">
              <Accordion defaultActiveKey="0">
                {FAQS.map((faq) => (
                  <Card>
                    <Card.Header>
                      <ContextAwareToggle eventKey={faq.faq_id}>
                        <span>{faq.faq_question}</span>
                      </ContextAwareToggle>{" "}
                    </Card.Header>
                    <Accordion.Collapse eventKey={faq.faq_id}>
                      <Card.Body>
                        <p>{faq.faq_answer}</p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
